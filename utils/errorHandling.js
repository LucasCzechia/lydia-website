// Comprehensive error handling utilities

// Error types
export const ErrorTypes = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  AUTHENTICATION: 'AUTHENTICATION_ERROR',
  AUTHORIZATION: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR',
  SERVER: 'SERVER_ERROR',
  CLIENT: 'CLIENT_ERROR',
  TIMEOUT: 'TIMEOUT_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

// Error severities
export const ErrorSeverity = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

// Custom error class
export class AppError extends Error {
  constructor(message, type = ErrorTypes.UNKNOWN, severity = ErrorSeverity.MEDIUM, context = {}) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.severity = severity;
    this.context = context;
    this.timestamp = new Date().toISOString();
    this.id = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      message: this.message,
      type: this.type,
      severity: this.severity,
      context: this.context,
      timestamp: this.timestamp,
      stack: this.stack
    };
  }
}

// Network error handling
export class NetworkError extends AppError {
  constructor(message, status = null, url = null) {
    super(message, ErrorTypes.NETWORK, ErrorSeverity.MEDIUM, { status, url });
    this.name = 'NetworkError';
    this.status = status;
    this.url = url;
  }
}

// Validation error handling
export class ValidationError extends AppError {
  constructor(message, field = null, value = null) {
    super(message, ErrorTypes.VALIDATION, ErrorSeverity.LOW, { field, value });
    this.name = 'ValidationError';
    this.field = field;
    this.value = value;
  }
}

// Error logger utility
export class ErrorLogger {
  static logs = [];
  static maxLogs = 100;

  static log(error, context = {}) {
    const errorEntry = {
      id: error.id || `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      error: error instanceof AppError ? error.toJSON() : {
        name: error.name || 'Error',
        message: error.message || 'Unknown error',
        stack: error.stack,
        type: ErrorTypes.UNKNOWN,
        severity: ErrorSeverity.MEDIUM
      },
      context: {
        url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown',
        ...context
      }
    };

    // Add to local logs
    this.logs.unshift(errorEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // Console logging in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', errorEntry);
    }

    // Send to analytics if available
    this.sendToAnalytics(errorEntry);

    return errorEntry.id;
  }

  static sendToAnalytics(errorEntry) {
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: errorEntry.error.message,
          fatal: errorEntry.error.severity === ErrorSeverity.CRITICAL,
          error_id: errorEntry.id,
          error_type: errorEntry.error.type
        });
      }
    } catch (analyticsError) {
      console.warn('Failed to send error to analytics:', analyticsError);
    }
  }

  static getLogs(limit = 10) {
    return this.logs.slice(0, limit);
  }

  static clearLogs() {
    this.logs = [];
  }

  static getLogsByType(type, limit = 10) {
    return this.logs
      .filter(log => log.error.type === type)
      .slice(0, limit);
  }

  static getLogsBySeverity(severity, limit = 10) {
    return this.logs
      .filter(log => log.error.severity === severity)
      .slice(0, limit);
  }
}

// Async error wrapper
export function withErrorHandling(asyncFn, errorHandler = null) {
  return async function(...args) {
    try {
      return await asyncFn.apply(this, args);
    } catch (error) {
      const appError = error instanceof AppError ? error : new AppError(
        error.message || 'An unexpected error occurred',
        ErrorTypes.UNKNOWN,
        ErrorSeverity.MEDIUM,
        { originalError: error.name }
      );

      const logId = ErrorLogger.log(appError, {
        function: asyncFn.name,
        args: args.length
      });

      if (errorHandler) {
        return errorHandler(appError, logId);
      }

      throw appError;
    }
  };
}

// API error handler
export function handleApiError(error, url = '') {
  if (!error.response) {
    // Network error
    return new NetworkError(
      'Network error occurred. Please check your internet connection.',
      null,
      url
    );
  }

  const status = error.response.status;
  const message = error.response.data?.message || error.message || 'An error occurred';

  switch (status) {
    case 400:
      return new ValidationError(message);
    case 401:
      return new AppError(
        'Authentication required. Please log in.',
        ErrorTypes.AUTHENTICATION,
        ErrorSeverity.MEDIUM
      );
    case 403:
      return new AppError(
        'Access denied. You do not have permission to perform this action.',
        ErrorTypes.AUTHORIZATION,
        ErrorSeverity.MEDIUM
      );
    case 404:
      return new AppError(
        'The requested resource was not found.',
        ErrorTypes.NOT_FOUND,
        ErrorSeverity.LOW
      );
    case 408:
      return new AppError(
        'Request timeout. Please try again.',
        ErrorTypes.TIMEOUT,
        ErrorSeverity.MEDIUM
      );
    case 429:
      return new AppError(
        'Too many requests. Please wait a moment and try again.',
        ErrorTypes.CLIENT,
        ErrorSeverity.MEDIUM
      );
    case 500:
    case 502:
    case 503:
    case 504:
      return new AppError(
        'Server error occurred. Please try again later.',
        ErrorTypes.SERVER,
        ErrorSeverity.HIGH,
        { status }
      );
    default:
      return new AppError(
        message,
        status >= 500 ? ErrorTypes.SERVER : ErrorTypes.CLIENT,
        status >= 500 ? ErrorSeverity.HIGH : ErrorSeverity.MEDIUM,
        { status }
      );
  }
}

// Retry utility with exponential backoff
export async function retryWithBackoff(
  fn,
  maxAttempts = 3,
  baseDelay = 1000,
  maxDelay = 10000
) {
  let attempt = 1;
  
  while (attempt <= maxAttempts) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw new AppError(
          `Failed after ${maxAttempts} attempts: ${error.message}`,
          ErrorTypes.SERVER,
          ErrorSeverity.HIGH,
          { attempts: maxAttempts, originalError: error.message }
        );
      }

      const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
      await new Promise(resolve => setTimeout(resolve, delay));
      attempt++;
    }
  }
}

// Form validation error handler
export function handleValidationErrors(errors) {
  const validationErrors = {};
  
  if (Array.isArray(errors)) {
    errors.forEach(error => {
      if (error.field) {
        validationErrors[error.field] = error.message;
      }
    });
  } else if (typeof errors === 'object') {
    Object.keys(errors).forEach(field => {
      validationErrors[field] = errors[field];
    });
  }

  return validationErrors;
}

// Global error handler setup
export function setupGlobalErrorHandling() {
  if (typeof window === 'undefined') return;

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = new AppError(
      `Unhandled promise rejection: ${event.reason?.message || event.reason}`,
      ErrorTypes.UNKNOWN,
      ErrorSeverity.HIGH,
      { reason: event.reason }
    );

    ErrorLogger.log(error, { type: 'unhandledrejection' });
    
    // Prevent the default browser error handling
    event.preventDefault();
  });

  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    const error = new AppError(
      `Uncaught error: ${event.error?.message || event.message}`,
      ErrorTypes.UNKNOWN,
      ErrorSeverity.HIGH,
      {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      }
    );

    ErrorLogger.log(error, { type: 'uncaught' });
  });
}

// Error boundary helper
export function createErrorBoundaryHandler(component = 'Unknown') {
  return (error, errorInfo) => {
    const appError = new AppError(
      `Component error in ${component}: ${error.message}`,
      ErrorTypes.CLIENT,
      ErrorSeverity.HIGH,
      {
        component,
        componentStack: errorInfo.componentStack,
        errorBoundary: true
      }
    );

    ErrorLogger.log(appError, { type: 'componentError' });
  };
}

// Safe execution wrapper
export function safely(fn, fallback = null, errorHandler = null) {
  try {
    const result = fn();
    if (result instanceof Promise) {
      return result.catch(error => {
        if (errorHandler) {
          errorHandler(error);
        }
        return fallback;
      });
    }
    return result;
  } catch (error) {
    if (errorHandler) {
      errorHandler(error);
    }
    return fallback;
  }
}

// Timeout wrapper
export function withTimeout(promise, timeoutMs = 5000, timeoutMessage = 'Operation timed out') {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new AppError(
        timeoutMessage,
        ErrorTypes.TIMEOUT,
        ErrorSeverity.MEDIUM
      )), timeoutMs)
    )
  ]);
}

export default {
  AppError,
  NetworkError,
  ValidationError,
  ErrorLogger,
  ErrorTypes,
  ErrorSeverity,
  withErrorHandling,
  handleApiError,
  retryWithBackoff,
  handleValidationErrors,
  setupGlobalErrorHandling,
  createErrorBoundaryHandler,
  safely,
  withTimeout
};