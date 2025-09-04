import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/common/Layout';
import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Users, Eye, Server, Lock, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { useAppTheme } from '../../context/ThemeContext';
import { getConfig, getBotName } from '../../utils/configUtils';

const AnimatedBackground = dynamic(
  () => import('../../components/common/AnimatedBackground'),
  { ssr: false }
);

export default function Terms() {
  const { resolvedTheme } = useAppTheme();
  const [mounted, setMounted] = useState(false);
  const botName = getBotName();
  const botNameWithoutSymbol = getBotName(false);
  const aiModel = getConfig('bot.aiModel', "Google's Gemini 2.5 Flash");
  const discordSupportUrl = getConfig('urls.discord.supportServer');
  const privacyUrl = getConfig('urls.nav.privacy');
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

  const sections = [
    {
      icon: Users,
      title: "Usage Guidelines",
      content: [
        {
          subtitle: "Acceptable Use",
          text: (
            <>
              When using {botName}, you agree to use our service responsibly and in accordance with{' '}
              <a 
                href="https://discord.com/terms" 
                target="_blank" 
                rel="noopener noreferrer"
                className={clsx(
                  "inline-flex items-center font-medium underline decoration-2 underline-offset-2 transition-colors",
                  isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                )}
              >
                Discord's Terms of Service
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>. You may not use {botName} to generate harmful, illegal, unethical, or inappropriate content.
            </>
          )
        },
        {
          subtitle: "Prohibited Activities",
          list: [
            `Attempting to manipulate ${botName} to bypass safety mechanisms or content filters`,
            "Using the bot for automated spam, harassment, or malicious activities",
            "Sharing or distributing harmful, illegal, or offensive content through the bot",
            "Attempting to reverse engineer, modify, or interfere with the bot's functionality",
            "Using the service to violate any applicable laws or regulations"
          ]
        },
        {
          subtitle: "Community Standards",
          text: `${botName} is designed to enhance Discord communities. We expect users to respect other community members and maintain a positive environment when interacting with our AI assistant.`
        }
      ]
    },
    {
      icon: Server,
      title: "Service & Data",
      content: [
        {
          subtitle: "AI Processing",
          text: (
            <>
              {botName} utilizes {aiModel} to generate responses. Your conversations are processed by Google's AI services to provide intelligent and contextual responses. By using our service, you acknowledge that your interactions may be processed by third-party AI providers subject to{' '}
              <a 
                href="https://support.google.com/gemini/answer/13594961?hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className={clsx(
                  "inline-flex items-center font-medium underline decoration-2 underline-offset-2 transition-colors",
                  isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                )}
              >
                Google's Gemini Privacy Policy
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>.
            </>
          )
        },
        {
          subtitle: "Data Handling",
          text: (
            <>
              We collect and process minimal data necessary for service functionality, including Discord user IDs, server IDs, and conversation history for context maintenance. Your data is handled in accordance with our{' '}
              <Link 
                href="/legal/privacy"
                className={clsx(
                  "inline-flex items-center font-medium underline decoration-2 underline-offset-2 transition-colors",
                  isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                )}
              >
                Privacy Policy
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>{' '}
              and industry best practices.
            </>
          )
        },
        {
          subtitle: "Content Ownership",
          text: `You retain ownership of any content you create through interactions with ${botName}. However, by using our service, you grant us the necessary rights to process and respond to your content as part of the AI conversation experience.`
        }
      ]
    },
    {
      icon: AlertTriangle,
      title: "Service Limitations",
      content: [
        {
          subtitle: "AI Accuracy Disclaimer",
          text: `While ${botName} strives to provide accurate and helpful responses, AI-generated content may occasionally be incorrect, incomplete, or biased. You should not rely solely on ${botName} for critical decisions, especially in areas such as healthcare, finance, legal matters, or safety-critical situations.`
        },
        {
          subtitle: "Service Availability",
          list: [
            "The service may be temporarily unavailable due to maintenance, updates, or technical issues",
            "We reserve the right to modify, suspend, or discontinue the service at any time with reasonable notice",
            "Response times and service quality may vary based on server load and technical conditions",
            "We do not guarantee 100% uptime or uninterrupted service availability"
          ]
        },
        {
          subtitle: "Content Moderation",
          text: `${botName} includes automated content filtering and safety measures. If you're flagged, we reserve the right to monitor conversations for abuse, violations of these terms, or to improve our service quality.`
        }
      ]
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      content: [
        {
          subtitle: "Data Protection",
          text: "We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, no method of electronic transmission or storage is 100% secure."
        },
        {
          subtitle: "Third-Party Services",
          text: (
            <>
              {botName} integrates with Discord and Google's AI services. Your use of our bot is also subject to{' '}
              <a 
                href="https://discord.com/terms" 
                target="_blank" 
                rel="noopener noreferrer"
                className={clsx(
                  "inline-flex items-center font-medium underline decoration-2 underline-offset-2 transition-colors",
                  isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                )}
              >
                Discord's Terms of Service
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>{' '}
              and{' '}
              <a 
                href="https://gemini.google/policy-guidelines/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={clsx(
                  "inline-flex items-center font-medium underline decoration-2 underline-offset-2 transition-colors",
                  isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                )}
              >
                Google's AI service policies
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>. We encourage you to review{' '}
              <a 
                href="https://discord.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className={clsx(
                  "inline-flex items-center font-medium underline decoration-2 underline-offset-2 transition-colors",
                  isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                )}
              >
                Discord's Privacy Policy
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>{' '}
              and{' '}
              <a 
                href="https://support.google.com/gemini/answer/13594961?hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className={clsx(
                  "inline-flex items-center font-medium underline decoration-2 underline-offset-2 transition-colors",
                  isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                )}
              >
                Google's Privacy Policy
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>.
            </>
          )
        },
        {
          subtitle: "Privacy Rights",
          text: (
            <>
              For detailed information about how we collect, use, and protect your data, please review our{' '}
              <Link 
                href="/legal/privacy"
                className={clsx(
                  "inline-flex items-center font-medium underline decoration-2 underline-offset-2 transition-colors",
                  isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                )}
              >
                Privacy Policy
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>. You have certain rights regarding your personal data, which are outlined in our privacy documentation.
            </>
          )
        }
      ]
    },
    {
      icon: Eye,
      title: "Enforcement",
      content: [
        {
          subtitle: "Violation Consequences",
          text: `Violations of these terms may result in temporary or permanent suspension of your access to ${botName}. We reserve the right to take appropriate action based on the severity and nature of the violation.`
        },
        {
          subtitle: "Reporting Violations",
          text: `If you encounter misuse of ${botName} or violations of these terms, please report them through our Discord support server. We take all reports seriously and investigate them promptly.`
        },
        {
          subtitle: "Appeals Process",
          text: "If you believe your access has been suspended in error, you may appeal the decision by contacting our support team with relevant details and evidence."
        }
      ]
    }
  ];

  if (!mounted) {
    return (
      <Layout title={`Terms of Service - ${botName}`}>
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
    <Layout title={`Terms of Service - ${botName}`}>
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
                Terms of Service
              </h1>
              
              <p className={clsx(
                "text-lg md:text-xl max-w-3xl",
                isDark ? "text-gray-300" : "text-gray-600"
              )}>
                By using {botName}, you agree to the following terms and conditions. Please read these carefully to understand your rights and responsibilities.
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
                    isDark ? "bg-amber-500/10" : "bg-amber-100"
                  )}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <AlertTriangle size={24} className={isDark ? "text-amber-500" : "text-amber-600"} />
                </motion.div>
                <div>
                  <h3 className={clsx(
                    "text-lg font-semibold mb-2",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    Important Notice
                  </h3>
                  <p className={clsx(
                    "leading-relaxed",
                    isDark ? "text-gray-300" : "text-gray-700"
                  )}>
                    These terms constitute a legal agreement between you and the operators of {botName}. By using our Discord bot, you acknowledge that you have read, understood, and agree to be bound by these terms.
                  </p>
                </div>
              </div>
              
              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' }}
              />
            </motion.div>

            <div className="space-y-8">
              {sections.map((section, sectionIndex) => (
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

                    <div className="space-y-6">
                      {section.content.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <h3 className={clsx(
                            "text-lg font-semibold mb-3",
                            isDark ? "text-white/90" : "text-gray-800"
                          )}>
                            {item.subtitle}
                          </h3>
                          
                          {item.text && (
                            <div className={clsx(
                              "leading-relaxed mb-4",
                              isDark ? "text-gray-300" : "text-gray-700"
                            )}>
                              {item.text}
                            </div>
                          )}

                          {item.list && (
                            <ul className="space-y-2">
                              {item.list.map((listItem, listIndex) => (
                                <motion.li
                                  key={listIndex}
                                  className={clsx(
                                    "flex items-start",
                                    isDark ? "text-gray-300" : "text-gray-700"
                                  )}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: listIndex * 0.05 }}
                                  viewport={{ once: true }}
                                >
                                  <CheckCircle size={16} className="text-primary flex-shrink-0 mr-3 mt-0.5" />
                                  <span className="leading-relaxed">{listItem}</span>
                                </motion.li>
                              ))}
                            </ul>
                          )}
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
                Need Help or Have Questions?
              </h3>
              
              <p className={clsx(
                "mb-6 max-w-2xl mx-auto",
                isDark ? "text-gray-300" : "text-gray-700"
              )}>
                If you have any questions about these terms or need clarification on any point, please don't hesitate to contact our support team.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={discordSupportUrl} className="btn-primary">
                  Contact Support
                </Link>
                <Link href={privacyUrl} className="btn-secondary">
                  Privacy Policy
                </Link>
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