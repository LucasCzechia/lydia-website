const rateLimitStore = new Map();

export class RateLimit {
  constructor(options = {}) {
    this.windowMs = options.windowMs || 15 * 60 * 1000;
    this.maxRequests = options.maxRequests || 100;
    this.message = options.message || 'Too many requests';
    this.statusCode = options.statusCode || 429;
    this.keyGenerator = options.keyGenerator || this.defaultKeyGenerator;
    this.skipSuccessfulRequests = options.skipSuccessfulRequests || false;
    this.skipFailedRequests = options.skipFailedRequests || false;
  }

  defaultKeyGenerator(req) {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : req.connection.remoteAddress;
    return ip || 'unknown';
  }

  middleware() {
    return async (req, res, next) => {
      const key = this.keyGenerator(req);
      const now = Date.now();
      const windowStart = now - this.windowMs;

      if (!rateLimitStore.has(key)) {
        rateLimitStore.set(key, []);
      }

      const requests = rateLimitStore.get(key);
      const validRequests = requests.filter(timestamp => timestamp > windowStart);
      
      rateLimitStore.set(key, validRequests);

      if (validRequests.length >= this.maxRequests) {
        const oldestRequest = Math.min(...validRequests);
        const timeUntilReset = Math.ceil((oldestRequest + this.windowMs - now) / 1000);

        res.setHeader('X-RateLimit-Limit', this.maxRequests);
        res.setHeader('X-RateLimit-Remaining', 0);
        res.setHeader('X-RateLimit-Reset', new Date(oldestRequest + this.windowMs).toISOString());
        res.setHeader('Retry-After', timeUntilReset);

        return res.status(this.statusCode).json({
          error: this.message,
          retryAfter: timeUntilReset
        });
      }

      const originalSend = res.send;
      const originalJson = res.json;
      let requestLogged = false;

      const logRequest = () => {
        if (!requestLogged) {
          const shouldSkip = (this.skipSuccessfulRequests && res.statusCode < 400) ||
                           (this.skipFailedRequests && res.statusCode >= 400);
          
          if (!shouldSkip) {
            validRequests.push(now);
            rateLimitStore.set(key, validRequests);
          }
          requestLogged = true;
        }
      };

      res.send = function(...args) {
        logRequest();
        return originalSend.apply(this, args);
      };

      res.json = function(...args) {
        logRequest();
        return originalJson.apply(this, args);
      };

      res.setHeader('X-RateLimit-Limit', this.maxRequests);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, this.maxRequests - validRequests.length - 1));
      res.setHeader('X-RateLimit-Reset', new Date(now + this.windowMs).toISOString());

      if (typeof next === 'function') {
        next();
      }
    };
  }

  static cleanup() {
    const now = Date.now();
    for (const [key, requests] of rateLimitStore.entries()) {
      const validRequests = requests.filter(timestamp => timestamp > now - 24 * 60 * 60 * 1000);
      if (validRequests.length === 0) {
        rateLimitStore.delete(key);
      } else {
        rateLimitStore.set(key, validRequests);
      }
    }
  }
}

export const createRateLimit = (options) => new RateLimit(options);

export const rateLimitPresets = {
  strict: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 10,
    message: 'Too many requests, please try again later'
  },
  
  moderate: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 50,
    message: 'Rate limit exceeded'
  },
  
  lenient: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 200,
    message: 'Too many requests'
  },
  
  auth: {
    windowMs: 15 * 60 * 1000,
    maxRequests: 5,
    message: 'Too many authentication attempts',
    skipSuccessfulRequests: true
  },

  api: {
    windowMs: 60 * 1000,
    maxRequests: 60,
    message: 'API rate limit exceeded',
    keyGenerator: (req) => {
      if (req.user?.id) {
        return `user:${req.user.id}`;
      }
      const forwarded = req.headers['x-forwarded-for'];
      const ip = forwarded ? forwarded.split(',')[0] : req.connection.remoteAddress;
      return `ip:${ip}`;
    }
  }
};

export const applyRateLimit = (preset = 'moderate') => {
  const options = rateLimitPresets[preset] || rateLimitPresets.moderate;
  return createRateLimit(options).middleware();
};

setInterval(() => {
  RateLimit.cleanup();
}, 60 * 60 * 1000);
