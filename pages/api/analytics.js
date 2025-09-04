// Simple in-memory cache with TTL - replace with Redis/Database in production
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Utility functions for security
function validateEnvironment() {
  const requiredVars = ['ANALYTICS_API_KEY'];
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  return {
    apiKey: process.env.ANALYTICS_API_KEY
  };
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '3600');
}

function validateAnalyticsData(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid analytics data format');
  }
  
  // Basic schema validation
  const schema = {
    bot: ['guilds', 'users', 'shards', 'uptime', 'startTime'],
    analytics: {
      usage: ['totalRequests', 'uniqueUsers', 'uniqueServers'],
      commands: ['totalCommands', 'uniqueCommands'],
      tokens: ['totalTokens', 'totalRequests'],
      images: ['totalGenerations', 'totalImages']
    }
  };
  
  return true; // Basic validation passed
}

function sanitizeAnalyticsData(data) {
  const sanitized = {
    timestamp: Date.now(),
    receivedAt: Date.now(),
    bot: {
      guilds: Math.max(0, parseInt(data.bot?.guilds) || 0),
      users: Math.max(0, parseInt(data.bot?.users) || 0),
      shards: Math.max(1, parseInt(data.bot?.shards) || 1),
      uptime: parseInt(data.bot?.uptime) || Date.now(),
      startTime: parseInt(data.bot?.startTime) || Date.now()
    },
    analytics: {
      usage: {
        totalRequests: Math.max(0, parseInt(data.analytics?.usage?.totalRequests) || 0),
        uniqueUsers: Math.max(0, parseInt(data.analytics?.usage?.uniqueUsers) || 0),
        uniqueServers: Math.max(0, parseInt(data.analytics?.usage?.uniqueServers) || 0),
        dailyRequests: Array.isArray(data.analytics?.usage?.dailyRequests) ? data.analytics.usage.dailyRequests.slice(0, 30) : [],
        userStats: Array.isArray(data.analytics?.usage?.userStats) ? data.analytics.usage.userStats.slice(0, 100) : []
      },
      commands: {
        totalCommands: Math.max(0, parseInt(data.analytics?.commands?.totalCommands) || 0),
        uniqueCommands: Math.max(0, parseInt(data.analytics?.commands?.uniqueCommands) || 0),
        topCommands: Array.isArray(data.analytics?.commands?.topCommands) ? data.analytics.commands.topCommands.slice(0, 20) : [],
        dailyCommands: Array.isArray(data.analytics?.commands?.dailyCommands) ? data.analytics.commands.dailyCommands.slice(0, 30) : []
      },
      tokens: {
        totalTokens: Math.max(0, parseInt(data.analytics?.tokens?.totalTokens) || 0),
        totalRequests: Math.max(0, parseInt(data.analytics?.tokens?.totalRequests) || 0),
        averageTokensPerRequest: Math.max(0, parseFloat(data.analytics?.tokens?.averageTokensPerRequest) || 0),
        dailyTokens: Array.isArray(data.analytics?.tokens?.dailyTokens) ? data.analytics.tokens.dailyTokens.slice(0, 30) : []
      },
      images: {
        totalGenerations: Math.max(0, parseInt(data.analytics?.images?.totalGenerations) || 0),
        totalImages: Math.max(0, parseInt(data.analytics?.images?.totalImages) || 0),
        successRate: String(parseFloat(data.analytics?.images?.successRate) || 0),
        dailyGenerations: Array.isArray(data.analytics?.images?.dailyGenerations) ? data.analytics.images.dailyGenerations.slice(0, 30) : []
      }
    }
  };
  
  return sanitized;
}

function getCachedData() {
  const cached = cache.get('analytics');
  if (!cached) return null;
  
  const { data, timestamp } = cached;
  if (Date.now() - timestamp > CACHE_TTL) {
    cache.delete('analytics');
    return null;
  }
  
  return data;
}

function setCachedData(data) {
  cache.set('analytics', {
    data: data,
    timestamp: Date.now()
  });
}

export default async function handler(req, res) {
  // Set CORS headers for all requests
  setCorsHeaders(res);
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const env = validateEnvironment();
    
    if (req.method === 'POST') {
      // Validate authorization
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
          error: 'Unauthorized',
          message: 'Missing or invalid authorization header'
        });
      }
      
      const providedKey = authHeader.substring(7).trim();
      if (!providedKey || providedKey !== env.apiKey) {
        return res.status(401).json({ 
          error: 'Unauthorized',
          message: 'Invalid API key'
        });
      }
      
      // Validate request body
      if (!req.body) {
        return res.status(400).json({ 
          error: 'Bad Request',
          message: 'Missing request body'
        });
      }
      
      // Validate and sanitize analytics data
      validateAnalyticsData(req.body);
      const sanitizedData = sanitizeAnalyticsData(req.body);
      
      // Store in cache (replace with database in production)
      setCachedData(sanitizedData);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Analytics data received successfully',
        timestamp: sanitizedData.timestamp
      });
      
    } else if (req.method === 'GET') {
      const cachedData = getCachedData();
      
      if (!cachedData) {
        return res.status(404).json({
          error: 'No Data Available',
          message: 'No analytics data available. The bot may not have posted data recently.',
          lastUpdate: null
        });
      }
      
      // Add cache headers
      res.setHeader('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
      res.setHeader('ETag', `"${cachedData.timestamp}"`);
      
      return res.status(200).json(cachedData);
      
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
      return res.status(405).json({ 
        error: 'Method Not Allowed',
        message: `Method ${req.method} is not allowed. Use GET or POST.`
      });
    }
    
  } catch (error) {
    console.error('Analytics API Error:', {
      message: error.message,
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString()
    });
    
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: 'An unexpected error occurred while processing your request.'
    });
  }
}