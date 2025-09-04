import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';
const REFRESH_EXPIRES_IN = '30d';

export class AuthService {
  static generateTokens(user) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        type: 'access'
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        type: 'refresh'
      },
      JWT_SECRET,
      { expiresIn: REFRESH_EXPIRES_IN }
    );

    return { accessToken, refreshToken };
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static async refreshAccessToken(refreshToken) {
    try {
      const decoded = this.verifyToken(refreshToken);
      
      if (decoded.type !== 'refresh') {
        throw new Error('Invalid refresh token');
      }

      const user = await this.getUserById(decoded.id);
      if (!user) {
        throw new Error('User not found');
      }

      const { accessToken } = this.generateTokens(user);
      return accessToken;
    } catch (error) {
      throw new Error('Token refresh failed');
    }
  }

  static setAuthCookies(res, accessToken, refreshToken) {
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.setHeader('Set-Cookie', [
      `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax${isProduction ? '; Secure' : ''}`,
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${30 * 24 * 60 * 60}; SameSite=Lax${isProduction ? '; Secure' : ''}`
    ]);
  }

  static clearAuthCookies(res) {
    res.setHeader('Set-Cookie', [
      'accessToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax',
      'refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax'
    ]);
  }

  static getTokenFromRequest(req) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    
    return req.cookies?.accessToken || null;
  }

  static async getUserById(id) {
    try {
      const response = await fetch(`https://discord.com/api/v10/users/${id}`, {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`
        }
      });

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      return null;
    }
  }

  static async exchangeCodeForTokens(code) {
    const data = {
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI
    };

    const response = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for tokens');
    }

    return await response.json();
  }

  static async getDiscordUser(accessToken) {
    const response = await fetch('https://discord.com/api/v10/users/@me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    return await response.json();
  }

  static getAvatarUrl(user) {
    if (!user.avatar) {
      return `https://cdn.discordapp.com/embed/avatars/${parseInt(user.id) % 5}.png`;
    }
    
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=256`;
  }

  static formatUser(discordUser) {
    return {
      id: discordUser.id,
      username: discordUser.username,
      displayName: discordUser.global_name || discordUser.display_name || discordUser.username,
      avatar: this.getAvatarUrl(discordUser),
      verified: discordUser.verified,
      locale: discordUser.locale,
      mfaEnabled: discordUser.mfa_enabled,
      flags: discordUser.flags,
      premiumType: discordUser.premium_type
    };
  }
}

export const withAuth = (handler) => {
  return async (req, res) => {
    try {
      const token = AuthService.getTokenFromRequest(req);
      
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }

      const decoded = AuthService.verifyToken(token);
      req.user = decoded;
      
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};

export const withOptionalAuth = (handler) => {
  return async (req, res) => {
    try {
      const token = AuthService.getTokenFromRequest(req);
      
      if (token) {
        const decoded = AuthService.verifyToken(token);
        req.user = decoded;
      }
      
      return handler(req, res);
    } catch (error) {
      req.user = null;
      return handler(req, res);
    }
  };
};
