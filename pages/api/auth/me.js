import { withAuth } from '../../../utils/auth';
import { applyRateLimit } from '../../../utils/rateLimit';

async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = {
      id: req.user.id,
      username: req.user.username,
      displayName: req.user.displayName || req.user.username,
      avatar: req.user.avatar,
      email: req.user.email,
      verified: req.user.verified,
      locale: req.user.locale,
      mfaEnabled: req.user.mfaEnabled,
      flags: req.user.flags,
      premiumType: req.user.premiumType
    };

    res.status(200).json(user);
  } catch (error) {
    console.error('Me endpoint error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default function rateLimitedHandler(req, res) {
  const rateLimitMiddleware = applyRateLimit('api');
  
  return new Promise((resolve) => {
    rateLimitMiddleware(req, res, () => {
      withAuth(handler)(req, res);
      resolve();
    });
  });
}
