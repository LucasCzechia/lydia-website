import { useState, useEffect } from 'react';
import Layout from '../../components/common/Layout';
import { motion } from 'framer-motion';
import { Shield, BarChart, Settings as SettingsIcon, AlertTriangle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useAppTheme } from '../../context/ThemeContext';
import { useToast } from '../../components/ui/Toast';
import clsx from 'clsx';
import { getLegalInfo, getBotName } from '../../utils/configUtils';

import PrivacyHeader from '../../components/pages/settings/privacy/PrivacyHeader';
import StatusCard from '../../components/pages/settings/privacy/StatusCard';
import DataTypeCard from '../../components/pages/settings/privacy/DataTypeCard';
import AboutDataCard from '../../components/pages/settings/privacy/AboutDataCard';

const AnimatedBackground = dynamic(
  () => import('../../components/common/AnimatedBackground'),
  { ssr: false }
);

export default function PrivacySettings() {
  const { analyticsEnabled, setAnalytics } = useAnalytics();
  const { preferencesEnabled, setPreferencesEnabled } = useAppTheme();
  const { theme, resolvedTheme } = useAppTheme();
  const { showToast } = useToast();
  const botName = getBotName();
  const cookieTypes = getLegalInfo('cookies').types || [];
  const isDark = resolvedTheme === 'dark';

  const handleTogglePreference = (key) => {
    if (key === 'necessary') return;

    const newValue = key === 'analytics' ? !analyticsEnabled : !preferencesEnabled;

    if (key === 'analytics') {
      setAnalytics(newValue);
      showToast(
        `Analytics tracking ${newValue ? 'enabled' : 'disabled'}`,
        newValue ? 'success' : 'info'
      );
    } else if (key === 'preferences') {
      setPreferencesEnabled(newValue);
      showToast(
         `Site preferences ${newValue ? 'enabled' : 'disabled'}`,
         newValue ? 'success' : 'info'
      );
    }
  };

  const resetAllData = () => {
    if (window.confirm('This will clear all locally stored data. Continue?')) {
      localStorage.clear();
      sessionStorage.clear();
      setAnalytics(false);
      setPreferencesEnabled(true);
      showToast('All data has been reset', 'success');
      setTimeout(() => window.location.reload(), 100);
    }
  };

  const exportData = () => {
    try {
      const data = {
        preferences: JSON.parse(localStorage.getItem('cookiePreferences') || '{}'),
        theme: localStorage.getItem('theme') || 'system',
        compactMode: localStorage.getItem('compactMode') === 'true'
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${getBotName(false).toLowerCase()}-data-export.json`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      showToast('Data exported successfully', 'success');
    } catch (error) {
      console.error('Error exporting data:', error);
      showToast('Failed to export data', 'error');
    }
  };

  const dataTypes = [
    {
      id: 'necessary',
      name: 'Necessary Data',
      description: 'Essential for website functionality. Includes session-related information and basic features.',
      requiredText: 'Cannot be disabled.',
      icon: Shield,
      alwaysEnabled: true
    },
    {
      id: 'analytics',
      name: 'Analytics & Performance',
      description: 'Anonymous usage data via Vercel Analytics and Speed Insights to improve website performance.',
      icon: BarChart,
      alwaysEnabled: false
    },
    {
      id: 'preferences',
      name: 'Site Preferences',
      description: 'Remembers your settings like dark/light theme and compact mode. When disabled, site will use default theme (dark) and disable customizations.',
      icon: SettingsIcon,
      alwaysEnabled: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <Layout title={`Privacy Settings - ${botName}`}>
      <div className="framer-theme relative">
        <AnimatedBackground intensity="light" theme="primary" enableParallax={true} blendMode="overlay" />
        <div className="max-w-3xl mx-auto px-4 pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <PrivacyHeader 
              botName={botName} 
              isDark={isDark} 
              variants={itemVariants} 
            />

            <StatusCard 
              analyticsEnabled={analyticsEnabled}
              preferencesEnabled={preferencesEnabled}
              handleTogglePreference={handleTogglePreference}
              exportData={exportData}
              resetAllData={resetAllData}
              botName={botName}
              isDark={isDark}
              variants={itemVariants}
            />

            <motion.div variants={itemVariants} className="mb-8">
              <h2 className={clsx(
                "text-lg font-semibold mb-4",
                isDark ? "text-white" : "text-gray-900"
              )}>
                Data Collection Preferences
              </h2>
              
              <div className="space-y-3">
                {dataTypes.map((dataType) => {
                  const isChecked = dataType.id === 'analytics'
                    ? analyticsEnabled
                    : dataType.id === 'preferences'
                      ? preferencesEnabled
                      : true;
                  
                  return (
                    <DataTypeCard
                      key={dataType.id}
                      dataType={dataType}
                      isChecked={isChecked}
                      handleTogglePreference={handleTogglePreference}
                      isDark={isDark}
                    />
                  );
                })}
              </div>
            </motion.div>

            <AboutDataCard 
              botName={botName} 
              isDark={isDark} 
              variants={itemVariants} 
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
