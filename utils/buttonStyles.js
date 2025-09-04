import clsx from 'clsx';

// Base button styles
const baseButtonClasses = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

// Size variants
const sizeVariants = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-3 text-lg",
  xl: "px-10 py-4 text-xl"
};

// Primary button styles
export const primaryButtonStyles = (size = 'md', isDark = false) => clsx(
  baseButtonClasses,
  sizeVariants[size],
  "bg-[#0055FF] text-white border-[3px] border-solid border-white/15",
  "shadow-[0px_8px_40px_0px_rgba(0,85,255,0.5),0px_0px_0px_1px_rgba(0,85,255,0.12)]",
  "hover:shadow-[0px_8px_40px_0px_rgba(0,85,255,0.7),inset_0px_0px_10px_1px_rgba(255,255,255,0.3),0px_0px_0px_5px_rgba(0,85,255,0.2)]",
  "focus:ring-blue-500",
  "active:scale-[0.98]"
);

// Secondary button styles
export const secondaryButtonStyles = (size = 'md', isDark = false) => clsx(
  baseButtonClasses,
  sizeVariants[size],
  "bg-transparent font-medium border",
  isDark
    ? "border-primary hover:border-secondary text-white hover:bg-blue-600/20 focus:ring-blue-500"
    : "border-primary hover:border-secondary text-primary hover:bg-blue-100/50 focus:ring-blue-500",
  "active:scale-[0.98]"
);

// Outline button styles
export const outlineButtonStyles = (size = 'md', isDark = false) => clsx(
  baseButtonClasses,
  sizeVariants[size],
  "border-2 border-gray-300 bg-transparent",
  isDark
    ? "text-white border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 focus:ring-gray-500"
    : "text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50 focus:ring-gray-500",
  "active:scale-[0.98]"
);

// Ghost button styles
export const ghostButtonStyles = (size = 'md', isDark = false) => clsx(
  baseButtonClasses,
  sizeVariants[size],
  "border-0 bg-transparent",
  isDark
    ? "text-gray-300 hover:bg-gray-800/50 focus:ring-gray-500"
    : "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
  "active:scale-[0.98]"
);

// Danger button styles
export const dangerButtonStyles = (size = 'md', isDark = false) => clsx(
  baseButtonClasses,
  sizeVariants[size],
  "bg-red-600 text-white border-2 border-red-600",
  "hover:bg-red-700 hover:border-red-700",
  "focus:ring-red-500",
  "active:scale-[0.98]"
);

// Success button styles
export const successButtonStyles = (size = 'md', isDark = false) => clsx(
  baseButtonClasses,
  sizeVariants[size],
  "bg-green-600 text-white border-2 border-green-600",
  "hover:bg-green-700 hover:border-green-700",
  "focus:ring-green-500",
  "active:scale-[0.98]"
);

// Icon button styles
export const iconButtonStyles = (size = 'md', variant = 'ghost', isDark = false) => {
  const iconSizes = {
    sm: "w-8 h-8 p-1",
    md: "w-10 h-10 p-2",
    lg: "w-12 h-12 p-3",
    xl: "w-14 h-14 p-3.5"
  };

  const baseIconClasses = clsx(
    "inline-flex items-center justify-center rounded-full transition-all duration-200 ease-out",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "active:scale-[0.95]",
    iconSizes[size]
  );

  switch (variant) {
    case 'primary':
      return clsx(
        baseIconClasses,
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
      );
    case 'secondary':
      return clsx(
        baseIconClasses,
        "border-2",
        isDark
          ? "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800/50 focus:ring-gray-500"
          : "border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 focus:ring-gray-500"
      );
    case 'danger':
      return clsx(
        baseIconClasses,
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
      );
    case 'ghost':
    default:
      return clsx(
        baseIconClasses,
        isDark
          ? "text-gray-300 hover:bg-gray-800/50 focus:ring-gray-500"
          : "text-gray-600 hover:bg-gray-100 focus:ring-gray-500"
      );
  }
};

// Card styles
export const cardStyles = (isDark = false, interactive = false) => clsx(
  "rounded-lg border backdrop-blur-sm transition-all duration-200",
  isDark
    ? "bg-gray-900/50 border-gray-700/50"
    : "bg-white/50 border-gray-200/50",
  interactive && "hover:shadow-lg cursor-pointer",
  interactive && (isDark ? "hover:bg-gray-900/70" : "hover:bg-white/70")
);

// Input styles
export const inputStyles = (isDark = false, hasError = false) => clsx(
  "w-full px-4 py-2 rounded-lg border transition-all duration-200",
  "focus:outline-none focus:ring-2 focus:ring-offset-2",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  hasError
    ? "border-red-500 focus:ring-red-500"
    : isDark
    ? "border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
);

// Badge styles
export const badgeStyles = (variant = 'default', isDark = false) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  switch (variant) {
    case 'primary':
      return clsx(baseClasses, "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200");
    case 'success':
      return clsx(baseClasses, "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200");
    case 'warning':
      return clsx(baseClasses, "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200");
    case 'danger':
      return clsx(baseClasses, "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200");
    case 'default':
    default:
      return clsx(
        baseClasses,
        isDark
          ? "bg-gray-700 text-gray-300"
          : "bg-gray-100 text-gray-800"
      );
  }
};

// Modal styles
export const modalStyles = {
  overlay: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
  container: (isDark = false) => clsx(
    "w-full max-w-md mx-auto rounded-lg shadow-xl",
    "border backdrop-blur-sm",
    isDark
      ? "bg-gray-900/95 border-gray-700"
      : "bg-white/95 border-gray-200"
  ),
  header: "px-6 py-4 border-b border-gray-200 dark:border-gray-700",
  body: "px-6 py-4",
  footer: "px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3"
};

// Alert styles
export const alertStyles = (variant = 'info', isDark = false) => {
  const baseClasses = "p-4 rounded-lg border";
  
  switch (variant) {
    case 'success':
      return clsx(baseClasses, "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200");
    case 'warning':
      return clsx(baseClasses, "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200");
    case 'error':
      return clsx(baseClasses, "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200");
    case 'info':
    default:
      return clsx(baseClasses, "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200");
  }
};

export default {
  primaryButtonStyles,
  secondaryButtonStyles,
  outlineButtonStyles,
  ghostButtonStyles,
  dangerButtonStyles,
  successButtonStyles,
  iconButtonStyles,
  cardStyles,
  inputStyles,
  badgeStyles,
  modalStyles,
  alertStyles
};