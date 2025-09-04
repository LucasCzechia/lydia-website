import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/common/Layout';
import Link from 'next/link';
import { ArrowLeft, Shield, Database, Server, Eye, Lock, UserCheck, Clock, AlertTriangle, CheckCircle, Settings } from 'lucide-react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { useAppTheme } from '../../context/ThemeContext';
import { getConfig, getBotName } from '../../utils/configUtils';

const AnimatedBackground = dynamic(
  () => import('../../components/common/AnimatedBackground'),
  { ssr: false }
);

export default function Privacy() {
  const { resolvedTheme } = useAppTheme();
  const [mounted, setMounted] = useState(false);
  const botName = getBotName();
  const botNameWithoutSymbol = getBotName(false);
  const aiModel = getConfig('bot.aiModel', "Google's Gemini 2.5 Flash");
  const discordSupportUrl = getConfig('urls.discord.supportServer');
  const termsUrl = getConfig('urls.nav.terms');
  const supportEmail = getConfig('contact.email.privacy', 'privacy@lydia.app');
  const isDark = resolvedTheme === 'dark';
  const lastUpdated = "April 15, 2025";

  useEffect(() => {
    setMounted(true);
  }, []);

  const getCardStyle = () => {
    return isDark
      ? {
          background: 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.15) 0%, rgba(97, 97, 97, 0.09) 100%)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(255, 255, 255, 0.07)'
        }
      : {
          background: 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.05) 0%, rgba(240, 240, 240, 0.8) 100%)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(0, 0, 0, 0.07)'
        };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const dataTypes = [
    {
      icon: Database,
      title: "Information We Collect",
      items: [
        {
          name: "Discord Identifiers",
          description: "User IDs, server IDs, and channel IDs necessary for bot functionality and context awareness."
        },
        {
          name: "Message Content",
          description: "Text content of messages sent to the bot for processing and generating appropriate responses."
        },
        {
          name: "Conversation History",
          description: "Limited conversation context to maintain coherent and relevant dialogue across interactions."
        },
        {
          name: "Usage Analytics",
          description: "Anonymous usage patterns and performance metrics to improve service quality and reliability."
        }
      ]
    },
    {
      icon: Server,
      title: "How We Use Your Data",
      items: [
        {
          name: "AI Processing",
          description: `Your conversations are processed through ${aiModel} to generate intelligent, contextual responses tailored to your needs.`
        },
        {
          name: "Service Improvement",
          description: "We analyze usage patterns to enhance bot performance, add new features, and optimize user experience."
        },
        {
          name: "Context Maintenance",
          description: "We store limited conversation history to provide coherent, contextual responses during ongoing conversations."
        },
        {
          name: "Abuse Prevention",
          description: "We monitor for violations of our terms of service and implement necessary safety measures."
        }
      ]
    },
    {
      icon: Eye,
      title: "Data Sharing & Access",
      items: [
        {
          name: "Google AI Services",
          description: (
            <>
              Conversation data is processed by Google's {aiModel} service to generate AI responses, subject to{' '}
              <a 
                href="https://gemini.google/policy-guidelines/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={clsx(
                  "inline-flex items-center font-medium underline decoration-2 underline-offset-2 transition-colors",
                  isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                )}
              >
                Google's privacy policies
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>.
            </>
          )
        },
        {
          name: "No Third-Party Sales",
          description: "We never sell, rent, or trade your personal information to third parties for commercial purposes."
        },
        {
          name: "Team Access",
          description: "Our development team may access data for troubleshooting, improving service quality, or investigating abuse reports."
        },
        {
          name: "Legal Requirements",
          description: "We may disclose information when required by law or to protect our rights and the safety of our users."
        }
      ]
    },
    {
      icon: Lock,
      title: "Data Protection",
      items: [
        {
          name: "Encryption",
          description: "All data transmission is encrypted using industry-standard TLS protocols to ensure secure communication."
        },
        {
          name: "Access Controls",
          description: "Strict access controls limit data access to authorized personnel only, with comprehensive audit logging."
        },
        {
          name: "Data Minimization",
          description: "We collect and retain only the minimum amount of data necessary for service functionality."
        },
        {
          name: "Regular Audits",
          description: "We conduct regular security audits and assessments to maintain the highest protection standards."
        }
      ]
    }
  ];

  const rights = [
    {
      title: "Access Your Data",
      description: "Request a copy of the personal data we have collected about you and how it's being used."
    },
    {
      title: "Correct Information",
      description: "Request correction of any inaccurate or incomplete personal information we maintain."
    },
    {
      title: "Delete Your Data",
      description: "Request deletion of your personal data, subject to legal and operational requirements."
    },
    {
      title: "Restrict Processing",
      description: "Request that we limit how we process your personal information in certain circumstances."
    },
    {
      title: "Data Portability",
      description: "Request that we transfer your data to another service provider in a machine-readable format."
    },
    {
      title: "Object to Processing",
      description: "Object to our processing of your personal information for specific purposes like direct marketing."
    }
  ];

  if (!mounted) {
    return (
      <Layout title={`Privacy Policy - ${botName}`}>
        <div className="max-w-4xl mx-auto px-4 pt-20">
          <div className="animate-pulse">
            <div className="h-12 bg-card rounded mb-6 w-1/2"></div>
            <div className="h-6 bg-card rounded mb-12 w-2/3"></div>
            <div className="space-y-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-32 bg-card rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Privacy Policy - ${botName}`}>
      <div className="framer-theme relative">
        <AnimatedBackground intensity="light" theme="primary" enableParallax={true} blendMode="overlay" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10"
        >
          <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
            
            <motion.div variants={itemVariants} className="mb-8">
              <Link
                href="/settings"
                className={clsx(
                  "inline-flex items-center mb-6 transition-colors",
                  isDark ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"
                )}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Settings
              </Link>
              
              
              <h1 className={clsx(
                "text-4xl md:text-5xl font-bold mb-4 tracking-tight",
                isDark ? "text-white" : "text-gray-900"
              )}>
                Privacy Policy
              </h1>
              
              <p className={clsx(
                "text-lg md:text-xl max-w-3xl",
                isDark ? "text-gray-300" : "text-gray-600"
              )}>
                {botName} respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mb-8 rounded-[20px] border relative overflow-hidden p-6"
              style={getCardStyle()}
            >
              <div className="flex items-start">
                <motion.div
                  className={clsx(
                    "flex-shrink-0 mr-4 p-3 rounded-full",
                    isDark ? "bg-blue-900/30" : "bg-blue-100"
                  )}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <Shield size={24} className="text-primary" />
                </motion.div>
                <div>
                  <h3 className={clsx(
                    "text-lg font-semibold mb-2",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    Your Privacy Matters
                  </h3>
                  <p className={clsx(
                    "leading-relaxed",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    We believe in transparency about our data practices. This policy outlines exactly what information we collect, how we use it, and the controls you have over your personal data when using {botName}.
                  </p>
                </div>
              </div>
              
              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' }}
              />
            </motion.div>

            <div className="space-y-8 mb-12">
              {dataTypes.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  variants={itemVariants}
                  className="rounded-[20px] border relative overflow-hidden"
                  style={getCardStyle()}
                  whileHover={{ 
                    scale: 1.01,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-center mb-6">
                      <motion.div
                        className={clsx(
                          "flex-shrink-0 mr-4 p-3 rounded-full",
                          isDark ? "bg-blue-900/30" : "bg-blue-100"
                        )}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 360,
                          transition: { duration: 0.5 }
                        }}
                      >
                        <section.icon size={24} className="text-primary" />
                      </motion.div>
                      <h2 className={clsx(
                        "text-2xl font-bold",
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        {section.title}
                      </h2>
                    </div>

                    <div className="grid gap-4">
                      {section.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          className={clsx(
                            "p-4 rounded-lg border transition-colors",
                            isDark 
                              ? "bg-blue-900/10 border-blue-500/20 hover:border-blue-500/40" 
                              : "bg-blue-50 border-blue-200 hover:border-blue-300"
                          )}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIndex * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.02, y: -2 }}
                        >
                          <h4 className={clsx(
                            "font-semibold mb-2",
                            isDark ? "text-white" : "text-gray-900"
                          )}>
                            {item.name}
                          </h4>
                          <p className={clsx(
                            "text-sm leading-relaxed",
                            isDark ? "text-gray-300" : "text-gray-700"
                          )}>
                            {item.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="mb-8 rounded-[20px] border relative overflow-hidden"
              style={getCardStyle()}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <motion.div
                    className={clsx(
                      "flex-shrink-0 mr-4 p-3 rounded-full",
                      isDark ? "bg-green-900/30" : "bg-green-100"
                    )}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <UserCheck size={24} className="text-green-500" />
                  </motion.div>
                  <h2 className={clsx(
                    "text-2xl font-bold",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    Your Rights
                  </h2>
                </div>

                <p className={clsx(
                  "mb-6",
                  isDark ? "text-gray-300" : "text-gray-700"
                )}>
                  Depending on your location, you may have certain rights regarding your personal data:
                </p>

                <div className="grid gap-3">
                  {rights.map((right, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0 mr-3 mt-0.5" />
                      <div>
                        <h4 className={clsx(
                          "font-medium mb-1",
                          isDark ? "text-white" : "text-gray-900"
                        )}>
                          {right.title}
                        </h4>
                        <p className={clsx(
                          "text-sm",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )}>
                          {right.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' }}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mb-8 rounded-[20px] border relative overflow-hidden"
              style={getCardStyle()}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <motion.div
                    className={clsx(
                      "flex-shrink-0 mr-4 p-3 rounded-full",
                      isDark ? "bg-purple-900/30" : "bg-purple-100"
                    )}
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Settings size={24} className="text-purple-500" />
                  </motion.div>
                  <h2 className={clsx(
                    "text-2xl font-bold",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    Data Retention & Deletion
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className={clsx(
                      "font-semibold mb-2",
                      isDark ? "text-white" : "text-gray-900"
                    )}>
                      Retention Period
                    </h4>
                    <p className={clsx(
                      "leading-relaxed",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      We retain conversation data for a limited period to provide contextual responses and improve our services. Most conversation data is automatically deleted after 30 days unless required for ongoing functionality.
                    </p>
                  </div>

                  <div>
                    <h4 className={clsx(
                      "font-semibold mb-2",
                      isDark ? "text-white" : "text-gray-900"
                    )}>
                      Request Deletion
                    </h4>
                    <p className={clsx(
                      "leading-relaxed",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      You can request deletion of your data at any time by contacting our support team. We will process your request within 30 days, subject to legal obligations and legitimate business interests.
                    </p>
                  </div>
                </div>
              </div>
              
              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' }}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 text-center rounded-[20px] border relative overflow-hidden p-8"
              style={getCardStyle()}
            >
              <motion.div
                className={clsx(
                  "inline-flex items-center mb-4 p-3 rounded-full",
                  isDark ? "bg-blue-900/30" : "bg-blue-100"
                )}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                <Clock size={24} className="text-primary" />
              </motion.div>
              
              <h3 className={clsx(
                "text-xl font-semibold mb-4",
                isDark ? "text-white" : "text-gray-900"
              )}>
                Questions or Concerns?
              </h3>
              
              <p className={clsx(
                "mb-6 max-w-2xl mx-auto",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>
                If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to contact us. We're here to help and ensure your privacy is protected.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={discordSupportUrl} className="btn-primary">
                  Contact Support
                </Link>
                <a href={`mailto:${supportEmail}`} className="btn-secondary">
                  Email Privacy Team
                </a>
              </div>
              
              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' }}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 text-center"
            >
              <p className={clsx(
                "text-sm",
                isDark ? "text-gray-500" : "text-gray-600"
              )}>
                Last updated: {lastUpdated} • Version 2.0
              </p>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </Layout>
  );
}