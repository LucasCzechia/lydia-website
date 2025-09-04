import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/common/Layout';
import { Users, MessageSquare, Zap, Image, Bot, Activity, Globe, Clock, AlertTriangle, RefreshCw, UserPlus, UserCheck, Eye, EyeOff } from 'lucide-react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { useAppTheme } from '../context/ThemeContext';
import { getBotName } from '../utils/configUtils';
import StatCard from '../components/analytics/StatCard';
import ChartCard from '../components/analytics/ChartCard';
import AnalyticsChart from '../components/analytics/AnalyticsChart';
import MetricGrid from '../components/analytics/MetricGrid';

const AnimatedBackground = dynamic(
  () => import('../components/common/AnimatedBackground'),
  { ssr: false }
);

export default function Analytics() {
  const { resolvedTheme } = useAppTheme();
  const [mounted, setMounted] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  const [refreshError, setRefreshError] = useState(null);
  const [showUserActivity, setShowUserActivity] = useState(true);
  const [forceShowUserActivity, setForceShowUserActivity] = useState(false);
  
  const botName = getBotName();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
    fetchAnalyticsData();
    const interval = setInterval(fetchAnalyticsData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      if (!loading) setLoading(true);
      setRefreshError(null);
      
      const response = await fetch('/api/analytics', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (response.status === 404) {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'No analytics data available yet';
        
        if (!analyticsData) {
          setError(errorMessage);
        } else {
          setRefreshError('No new data available');
          setTimeout(() => setRefreshError(null), 3000);
        }
        setLastFetch(Date.now());
        return;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setAnalyticsData(data);
      setLastFetch(Date.now());
      setError(null);
      setRefreshError(null);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
      
      if (!analyticsData) {
        setError(err.message);
      } else {
        setRefreshError('Refresh failed');
        setTimeout(() => setRefreshError(null), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const formatUptime = (startTime) => {
    if (!startTime) return 'Unknown';
    const uptimeMs = Date.now() - startTime;
    
    const years = Math.floor(uptimeMs / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((uptimeMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const weeks = Math.floor((uptimeMs % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor((uptimeMs % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60));

    if (years > 0) {
      return months > 0 ? `${years}y ${months}mo` : `${years}y ${weeks}w`;
    } else if (months > 0) {
      return weeks > 0 ? `${months}mo ${weeks}w` : `${months}mo ${days}d`;
    } else if (weeks > 0) {
      return days > 0 ? `${weeks}w ${days}d` : `${weeks}w ${hours}h`;
    } else if (days > 0) {
      return hours > 0 ? `${days}d ${hours}h` : `${days}d ${minutes}m`;
    } else if (hours > 0) {
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };

  const formatTokens = (tokens) => {
    if (!tokens && tokens !== 0) return '0';
    if (tokens >= 1000000000) return (tokens / 1000000000).toFixed(2) + 'B';
    if (tokens >= 1000000) return (tokens / 1000000).toFixed(2) + 'M';
    if (tokens >= 1000) return (tokens / 1000).toFixed(1) + 'K';
    return tokens.toLocaleString();
  };

  const calculateRetentionRate = (userStats) => {
    if (!userStats || userStats.length === 0) return '0.0';
    
    let totalUsers = 0;
    let returningUsers = 0;
    
    userStats.forEach(day => {
      totalUsers += day.totalUsers || 0;
      returningUsers += day.existingUsers || 0;
    });
    
    if (totalUsers === 0) return '0.0';
    return ((returningUsers / totalUsers) * 100).toFixed(1);
  };

  const calculateNewUserRate = (userStats) => {
    if (!userStats || userStats.length === 0) return '0.0';
    
    let totalUsers = 0;
    let newUsers = 0;
    
    userStats.forEach(day => {
      totalUsers += day.totalUsers || 0;
      newUsers += day.newUsers || 0;
    });
    
    if (totalUsers === 0) return '0.0';
    return ((newUsers / totalUsers) * 100).toFixed(1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  if (!mounted) {
    return (
      <Layout title={`Analytics - ${botName}`}>
        <div className="max-w-7xl mx-auto px-4 pt-20">
          <div className="animate-pulse">
            <div className="h-12 bg-card rounded mb-6 w-1/3"></div>
            <MetricGrid.Stats className="mb-8">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-32 bg-card rounded-xl"></div>
              ))}
            </MetricGrid.Stats>
            <MetricGrid.Charts>
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-80 bg-card rounded-xl"></div>
              ))}
            </MetricGrid.Charts>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading && !analyticsData) {
    return (
      <Layout title={`Analytics - ${botName}`}>
        <div className="framer-theme relative">
          <AnimatedBackground intensity="light" theme="primary" enableParallax={true} blendMode="overlay" />
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center">
                <Activity size={48} className="mx-auto mb-4 text-primary animate-pulse" />
                <h2 className={clsx("text-xl font-semibold", isDark ? "text-white" : "text-gray-900")}>
                  Loading Analytics...
                </h2>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error && !analyticsData) {
    const isWaitingForData = error.includes('No analytics data available') || error.includes('not posted any analytics');
    
    return (
      <Layout title={`Analytics - ${botName}`}>
        <div className="framer-theme relative">
          <AnimatedBackground intensity="light" theme="primary" enableParallax={true} blendMode="overlay" />
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center">
              {isWaitingForData ? (
                <Clock size={48} className="mx-auto mb-4 text-blue-500" />
              ) : (
                <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
              )}
              <h2 className={clsx("text-2xl font-bold mb-4", isDark ? "text-white" : "text-gray-900")}>
                {isWaitingForData ? 'Waiting for Analytics Data' : 'Unable to Load Analytics'}
              </h2>
              <p className={clsx("text-lg mb-6", isDark ? "text-gray-300" : "text-gray-600")}>
                {error}
              </p>
              {isWaitingForData && (
                <p className={clsx("text-sm mb-6", isDark ? "text-gray-400" : "text-gray-500")}>
                  The bot posts analytics data every 5 minutes. Please check back shortly.
                </p>
              )}
              <button
                onClick={fetchAnalyticsData}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <RefreshCw size={16} className="mr-2 animate-spin" />
                ) : (
                  <RefreshCw size={16} className="mr-2" />
                )}
                {isWaitingForData ? 'Check Again' : 'Retry'}
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const avgTokensPerRequest = analyticsData?.analytics?.tokens?.averageTokensPerRequest || 0;
  const lastUpdate = analyticsData?.lastUpdate;
  const userStats = analyticsData?.analytics?.usage?.userStats || [];

  return (
    <Layout title={`Analytics - ${botName}`}>
      <div className="framer-theme relative">
        <AnimatedBackground intensity="light" theme="primary" enableParallax={true} blendMode="overlay" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10"
        >
          <section className="py-12 md:py-20 px-4 md:px-0">
            <div className="max-w-7xl mx-auto">
              
              <motion.div
                variants={itemVariants}
                className="mb-12 text-center"
              >
                <motion.div
                  className={clsx(
                    "relative inline-flex items-center mb-6 rounded-full px-5 py-2 border overflow-hidden",
                    isDark 
                      ? "bg-blue-950/50 backdrop-blur-lg border-blue-700/30"
                      : "bg-blue-100/70 backdrop-blur-lg border-blue-300/50"
                  )}
                  whileHover={{ scale: 1.05 }}
                >
                  <Activity size={16} className="text-primary mr-2.5" />
                  <span className={clsx(
                    "text-sm font-medium",
                    isDark ? "text-white/90" : "text-gray-800"
                  )}>
                    Analytics Dashboard
                  </span>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{
                      background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)'
                    }}
                  />
                </motion.div>

                <h1 className={clsx(
                  "text-4xl md:text-5xl font-bold mb-4 tracking-tight",
                  isDark ? "text-white" : "text-gray-900"
                )}>
                  {botName} Analytics
                </h1>

                <p className={clsx(
                  "text-lg md:text-xl max-w-2xl mx-auto",
                  isDark ? "text-gray-300" : "text-gray-600"
                )}>
                  Real-time insights into bot performance and usage statistics.
                </p>

                {lastUpdate && (
                  <div className="mt-4 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className={clsx(
                        "text-sm",
                        isDark ? "text-gray-400" : "text-gray-500"
                      )}>
                        Last updated: {new Date(lastUpdate).toLocaleTimeString()}
                      </div>
                      <button
                        onClick={fetchAnalyticsData}
                        className={clsx(
                          "inline-flex items-center px-3 py-1 rounded-full text-sm transition-colors",
                          isDark 
                            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                        disabled={loading}
                      >
                        {loading ? (
                          <RefreshCw size={14} className="mr-1 animate-spin" />
                        ) : (
                          <RefreshCw size={14} className="mr-1" />
                        )}
                        Refresh
                      </button>
                    </div>
                    
                    {analyticsData && !forceShowUserActivity && (
                      <button
                        onClick={() => setForceShowUserActivity(!forceShowUserActivity)}
                        className={clsx(
                          "inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors border",
                          isDark 
                            ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                            : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                        )}
                      >
                        <Eye size={14} className="mr-2" />
                        Show User Analytics
                      </button>
                    )}
                    
                    {analyticsData && forceShowUserActivity && (
                      <button
                        onClick={() => setForceShowUserActivity(!forceShowUserActivity)}
                        className={clsx(
                          "inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors border",
                          isDark 
                            ? "bg-blue-900/50 text-blue-300 border-blue-700/50 hover:bg-blue-900/70"
                            : "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200"
                        )}
                      >
                        <EyeOff size={14} className="mr-2" />
                        Hide User Analytics
                      </button>
                    )}
                  </div>
                )}

                {analyticsData && refreshError && (
                  <div className="mt-2 flex items-center justify-center">
                    <div className={clsx(
                      "inline-flex items-center px-3 py-1 rounded-full text-xs",
                      isDark ? "bg-yellow-900/30 text-yellow-300" : "bg-yellow-100 text-yellow-800"
                    )}>
                      <AlertTriangle size={12} className="mr-1" />
                      {refreshError === 'No new data available' ? 'No new data available' : 'Refresh failed - showing cached data'}
                    </div>
                  </div>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="mb-8">
                <MetricGrid.Stats>
                  <StatCard
                    title="Total Servers"
                    value={formatNumber(analyticsData?.bot?.guilds)}
                    icon={Globe}
                    color="text-blue-500"
                    subtitle="Discord communities"
                  />
                  <StatCard
                    title="Total Users"
                    value={formatNumber(analyticsData?.bot?.users)}
                    icon={Users}
                    color="text-green-500"
                    subtitle="Across all servers"
                  />
                  <StatCard
                    title="Commands Used"
                    value={formatNumber(analyticsData?.analytics?.commands?.totalCommands)}
                    icon={MessageSquare}
                    color="text-purple-500"
                    subtitle="Total interactions"
                  />
                  <StatCard
                    title="Bot Uptime"
                    value={formatUptime(analyticsData?.bot?.startTime)}
                    icon={Clock}
                    color="text-cyan-500"
                    subtitle="Current session"
                  />
                </MetricGrid.Stats>
              </motion.div>

              {forceShowUserActivity && (
                <motion.div variants={itemVariants} className="mb-8">
                  <MetricGrid.Stats>
                    <StatCard
                      title="Daily Active Users"
                      value={formatNumber(userStats[userStats.length - 1]?.totalUsers || 0)}
                      icon={UserCheck}
                      color="text-emerald-500"
                      subtitle="Last recorded day"
                    />
                    <StatCard
                      title="New User Rate"
                      value={calculateNewUserRate(userStats)}
                      icon={UserPlus}
                      color="text-blue-500"
                      subtitle="Of daily active users"
                    />
                    <StatCard
                      title="Retention Rate"
                      value={calculateRetentionRate(userStats)}
                      icon={Users}
                      color="text-purple-500"
                      subtitle="Returning users"
                    />
                    <StatCard
                      title="Unique Servers"
                      value={formatNumber(analyticsData?.analytics?.usage?.uniqueServers)}
                      icon={Globe}
                      color="text-orange-500"
                      subtitle="With activity"
                    />
                  </MetricGrid.Stats>
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="mb-8">
                <MetricGrid.Charts>
                  <ChartCard title="Daily Requests">
                    <AnalyticsChart
                      type="line"
                      data={analyticsData?.analytics?.usage?.dailyRequests || []}
                      dataKey="requests"
                      color="#2563EB"
                      valueLabel="Requests"
                    />
                  </ChartCard>

                  {forceShowUserActivity && (
                    <ChartCard title="User Activity Patterns">
                      <AnalyticsChart
                        type="area"
                        data={userStats}
                        dataKey="newUsers"
                        secondaryDataKey="existingUsers"
                        color="#10B981"
                        secondaryColor="#2563EB"
                        areaStack={true}
                        customTooltip={{
                          contentStyle: {
                            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                            border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                            borderRadius: '8px',
                            color: isDark ? '#FFFFFF' : '#000000'
                          },
                          labelFormatter: (value) => new Date(value).toLocaleDateString(),
                          formatter: (value, name) => [formatNumber(value), name === 'newUsers' ? 'New Users' : name === 'existingUsers' ? 'Returning Users' : 'Total Users']
                        }}
                      />
                    </ChartCard>
                  )}
                </MetricGrid.Charts>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-8">
                <MetricGrid.Charts>
                  <ChartCard title="Most Popular Commands">
                    <AnalyticsChart
                      type="bar"
                      data={analyticsData?.analytics?.commands?.topCommands || []}
                      dataKey="count"
                      xAxisKey="command"
                      color="#2563EB"
                      valueLabel="Uses"
                      formatLabel={(value) => value}
                    />
                  </ChartCard>

                  <ChartCard title="Token Usage Trend">
                    <AnalyticsChart
                      type="line"
                      data={analyticsData?.analytics?.tokens?.dailyTokens || []}
                      dataKey="tokens"
                      color="#10B981"
                      valueLabel="Tokens"
                      formatValue={formatTokens}
                    />
                  </ChartCard>
                </MetricGrid.Charts>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-8">
                <MetricGrid.Features>
                  <ChartCard title="Image Generation Activity" height="h-80">
                    <AnalyticsChart
                      type="bar"
                      data={analyticsData?.analytics?.images?.dailyGenerations || []}
                      dataKey="generations"
                      color="#F59E0B"
                      valueLabel="Generations"
                      barRadius={[2, 2, 0, 0]}
                    />
                  </ChartCard>

                  <StatCard
                    title="Total Tokens"
                    value={formatTokens(analyticsData?.analytics?.tokens?.totalTokens)}
                    icon={Zap}
                    color="text-yellow-500"
                    subtitle={`~${formatTokens(avgTokensPerRequest)} per request`}
                  />
                  <StatCard
                    title="Images Created"
                    value={formatNumber(analyticsData?.analytics?.images?.totalImages)}
                    icon={Image}
                    color="text-pink-500"
                    subtitle={`${formatNumber(analyticsData?.analytics?.images?.totalGenerations || 0)} generations`}
                  />
                </MetricGrid.Features>
              </motion.div>

            </div>
          </section>
        </motion.div>
      </div>
    </Layout>
  );
}