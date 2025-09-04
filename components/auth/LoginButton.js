import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DiscordIcon from '../icons/DiscordIcon';
import { useAppTheme } from '../../context/ThemeContext';
import clsx from 'clsx';

export default function LoginButton({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { resolvedTheme } = useAppTheme();
  const isDark = resolvedTheme === 'dark';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    primary: clsx(
      'bg-[#0055FF] text-white border border-blue-500/20',
      'shadow-lg hover:shadow-xl',
      'hover:bg-[#0048CC]'
    ),
    secondary: clsx(
      'bg-transparent border border-gray-300 font-medium',
      isDark
        ? 'text-white hover:bg-gray-800/50'
        : 'text-gray-700 hover:bg-gray-100/50'
    ),
    discord: clsx(
      'bg-[#5865F2] text-white border border-indigo-500/20',
      'shadow-lg hover:shadow-xl',
      'hover:bg-[#4752C4]'
    )
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login();
    } catch (error) {
      console.error('Login failed:', error);
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleLogin}
      disabled={loading}
      className={clsx(
        'inline-flex items-center justify-center font-medium rounded-lg',
        'transition-all duration-200 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'relative overflow-hidden',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      {...props}
    >
      {loading && (
        <motion.div
          className="absolute inset-0 bg-black/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
      
      {loading ? (
        <Loader2 size={20} className="animate-spin mr-2" />
      ) : variant === 'discord' ? (
        <DiscordIcon className="w-5 h-5 mr-2 fill-current" />
      ) : (
        <LogIn size={20} className="mr-2" />
      )}
      
      {children || (loading ? 'Connecting...' : 'Sign In')}
    </motion.button>
  );
}
