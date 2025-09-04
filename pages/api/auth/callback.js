import { AuthService } from '../../../utils/auth';
import { applyRateLimit } from '../../../utils/rateLimit';

export default function handler(req, res) {
  const rateLimitMiddleware = applyRateLimit('auth');
  
  return new Promise((resolve) => {
    rateLimitMiddleware(req, res, async () => {
      if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: 'Method not allowed' });
      }

      const { code, state, error } = req.query;

      if (error) {
        console.error('OAuth error:', error);
        return res.redirect(`/login?error=${error}`);
      }

      if (!code || !state) {
        return res.redirect('/login?error=invalid_request');
      }

      try {
        const tokens = await AuthService.exchangeCodeForTokens(code);
        const discordUser = await AuthService.getDiscordUser(tokens.access_token);
        const user = AuthService.formatUser(discordUser);

        const { accessToken, refreshToken } = AuthService.generateTokens(user);
        AuthService.setAuthCookies(res, accessToken, refreshToken);

        // Redirect to login page with success parameter to show success screen
        res.redirect('/login?success=true');
      } catch (error) {
        console.error('Callback error:', error);
        res.redirect('/login?error=server_error');
      }
      
      resolve();
    });
  });
}
