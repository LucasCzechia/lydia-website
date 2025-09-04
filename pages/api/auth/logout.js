import { AuthService } from '../../../utils/auth';
import { applyRateLimit } from '../../../utils/rateLimit';

export default function handler(req, res) {
  const rateLimitMiddleware = applyRateLimit('moderate');
  
  return new Promise((resolve) => {
    rateLimitMiddleware(req, res, () => {
      if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method not allowed' });
      }

      try {
        AuthService.clearAuthCookies(res);
        
        res.status(200).json({ 
          success: true,
          message: 'Logged out successfully' 
        });
      } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
      
      resolve();
    });
  });
}
