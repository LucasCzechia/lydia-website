const botName = "Lylia";
const botNameWithoutSymbol = "Lylia";
const aiModel = "Gemini 2.5 Flash";

const config = {
  bot: {
    name: botName,
    nameWithoutSymbol: botNameWithoutSymbol,
    version: "1.3.2",
    tagline: `Create and edit stunning images in Discord. Powered by Google's Gemini 2.5 Flash Image (Nano Banana).`,
    description: `Lylia - Powerful AI Discord Bot powered by Google's Gemini 2.5 Flash Image model. Create, edit, and transform images with natural language commands!`,
    releaseDate: "2025-04-10",
    aiModel: aiModel
  },
  urls: {
    website: "https://lydia.app",
    discord: {
      invite: "https://discord.com/oauth2/authorize?client_id=1250114494081007697",
      supportServer: "https://discord.gg/bolt",
      supportServerCode: "bolt"
    },
    social: {
      github: "https://github.com/lydia",
      twitter: "https://twitter.com/lydiaai",
      discord: "https://discord.gg/bolt"
    },
    nav: {
      home: "/",
      features: "/features",
      premium: "/premium",
      updates: "/updates",
      settings: "/settings",
      contact: "/contact",
      about: "/about",
      blog: "/blog",
      terms: "/legal/terms",
      privacy: "/legal/privacy",
      cookies: "/cookies",
      credits: "/credits",
      careers: "/careers",
      faq: "/faq"
    }
  },
  contact: {
    email: {
      support: "support@lydia.app",
      privacy: "privacy@lydia.app",
      business: "business@lydia.app"
    }
  },
  team: {
    developers: [
      {
        name: "Assem",
        role: "Owner & Lead Project Manager",
        avatar: "/images/developers/assem.png",
        discordUserId: "946789084876144641",
        socials: {
          discord: "https://discord.com/users/946789084876144641"
        }
      },
      {
        name: "Lucas",
        role: "Owner & Lead Developer",
        avatar: "/images/developers/lucas.png",
        discordUserId: "1146944562951106721",
        socials: {
          github: "https://github.com/LucasCzechia",
          discord: "https://discord.com/users/1146944562951106721"
        }
      },
      {
        name: "Alolo",
        role: "Partner & Developer",
        avatar: "/images/developers/alolo.png",
        discordUserId: "794543886742585366",
        socials: {
          discord: "https://discord.com/users/794543886742585366"
        }
      }
    ],
    betaTesters: [
      { name: "ProTon", role: "Ex. Developer & Beta Tester" },
      { name: "Fat Penguin", role: "Lead Beta Tester" },
      { name: "Nasrin", role: "Beta Tester" },
      { name: "Mahmoud", role: "Beta Tester" },
      { name: "MTN Dew", role: "Beta Tester" }
    ],
    inspirationText: `${botName} stands on the shoulders of giants. We're deeply grateful to the open-source community and the developers of the foundational technologies (like Discord, Google, Next.js, Vercel) that made this project a reality.`
  },
  features: [
    {
      id: "chatbot",
      icon: "Bot",
      title: "Instant Chatbot",
      description: `Add ${botName} for an instant AI assistant powered by Google's ${aiModel}.`,
      color: "text-blue-400",
      bg: "bg-blue-900/20",
      border: "hover:border-blue-500/50"
    },
    {
      id: "intelligence",
      icon: "Brain",
      title: "Advanced Intelligence",
      description: "Experience Google's cutting-edge AI, built for the agentic era.",
      color: "text-purple-400",
      bg: "bg-purple-900/20",
      border: "hover:border-purple-500/50"
    },
    {
      id: "privacy",
      icon: "Shield",
      title: "Privacy Focused",
      description: "Your data remains secure. All processing is local for maximum privacy.",
      color: "text-red-400",
      bg: "bg-red-900/20",
      border: "hover:border-red-500/50"
    },
    {
      id: "conversation",
      icon: "MessageSquare",
      title: "Natural Conversations",
      description: "Enjoy fluid, human-like interactions with deep context understanding.",
      color: "text-green-400",
      bg: "bg-green-900/20",
      border: "hover:border-green-500/50"
    }
  ],
  legal: {
    terms: {
      lastUpdated: "June 16th, 2025",
      version: "2.0"
    },
    privacy: {
      lastUpdated: "June 16th, 2025",
      version: "2.0"
    },
    cookies: {
      types: [
        {
          id: "necessary",
          name: "Necessary",
          description: "Required for the website to function properly. Includes cookies for session management and basic features.",
          icon: "Shield",
          required: true
        },
        {
          id: "analytics",
          name: "Analytics",
          description: "We use Vercel Analytics and Speed Insights to collect anonymous usage data that helps us improve website performance and user experience.",
          icon: "BarChart",
          required: false
        },
        {
          id: "preferences",
          name: "Preferences",
          description: "These cookies remember your settings like dark/light theme and compact mode preferences between visits.",
          icon: "Settings",
          required: false
        }
      ]
    }
  },
  branding: {
    colors: {
      primary: "#2563EB",
      secondary: "#1D4ED8"
    },
    images: {
      logo: "/images/lylia.webp",
      logoFull: "/images/lylia-full.webp",
      favicon: "/images/favicon/favicon.ico",
      ogImage: "/images/og-image.png",
      logoAlt: "Lylia Logo",
      placeholders: {
        user: "https://api.placeholder.com/40/777/fff?text=User"
      }
    }
  },
  meta: {
    title: `${botName} - AI Discord Bot`,
    defaultDescription: `${botName} - Powerful AI Discord Bot powered by Google's ${aiModel} model. Smart conversation, moderation, and more!`,
    pageTitles: {
      home: `${botName} - AI Discord Bot`,
      features: `Features - ${botName}`,
      premium: `Premium - ${botName}`,
      settings: `Settings - ${botName}`,
      privacy: `Privacy Policy - ${botName}`,
      terms: `Terms of Service - ${botName}`,
      credits: `Credits - ${botName}`,
      notFound: `Page Not Found - ${botName}`,
      serverError: `Server Error - ${botName}`
    },
    pageDescriptions: {
      home: `${botName} - Powerful AI Discord Bot powered by Google's ${aiModel} model. Smart conversation, moderation, and more!`,
      features: `Explore the features of ${botName}, the AI-powered Discord bot with conversation skills, moderation tools, and customization options.`,
      privacy: `${botName} Privacy Policy - Learn how we protect your data and ensure your privacy on Discord.`,
      terms: `${botName} Terms of Service - Guidelines and rules for using our AI Discord bot.`
    }
  },
  theme: {
    default: "dark",
    options: ["light", "dark", "system"]
  },
  development: {
    showDevNotice: process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_SHOW_DEV_NOTICE === 'true'
  }
};

export default config;
