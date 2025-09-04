import { AuthService } from '../../../utils/auth';
import { applyRateLimit } from '../../../utils/rateLimit';

export default function handler(req, res) {
  const rateLimitMiddleware = applyRateLimit('auth');
  
  return new Promise((resolve) => {
    rateLimitMiddleware(req, res, async () => {
      if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method not allowed' });
      }

      try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
          return res.status(401).json({ error: 'No refresh token provided' });
        }

        const newAccessToken = await AuthService.refreshAccessToken(refreshToken);
        
        const isProduction = process.env.NODE_ENV === 'production';
        res.setHeader('Set-Cookie', [
          `accessToken=${newAccessToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax${isProduction ? '; Secure' : ''}`
        ]);

        res.status(200).json({ 
          success: true,
          message: 'Token refreshed successfully' 
        });
      } catch (error) {
        console.error('Refresh token error:', error);
        AuthService.clearAuthCookies(res);
        res.status(401).json({ error: 'Invalid refresh token' });
      }
      
      resolve();
    });
  });
}
