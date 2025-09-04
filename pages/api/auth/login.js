import { applyRateLimit } from '../../../utils/rateLimit';

export default function handler(req, res) {
  const rateLimitMiddleware = applyRateLimit('auth');
  
  return new Promise((resolve) => {
    rateLimitMiddleware(req, res, () => {
      if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: 'Method not allowed' });
      }

      try {
        const state = Math.random().toString(36).substring(2, 15);
        
        const params = new URLSearchParams({
          client_id: process.env.DISCORD_CLIENT_ID,
          redirect_uri: process.env.DISCORD_REDIRECT_URI,
          response_type: 'code',
          scope: 'identify',
          state
        });

        const authUrl = `https://discord.com/api/oauth2/authorize?${params}`;

        res.status(200).json({
          url: authUrl,
          state
        });
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
      
      resolve();
    });
  });
}
