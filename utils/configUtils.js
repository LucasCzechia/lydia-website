import config from '../config';

export function getConfig(path, fallback = undefined) {
  try {
    if (!path || !config) return fallback;
    
    const keys = path.split('.');
    let value = config;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return fallback;
      }
    }
    
    return value !== undefined && value !== null ? value : fallback;
  } catch (error) {
    console.error(`Error accessing config path: ${path}`, error);
    return fallback;
  }
}

export function getPageTitle(pageName = '') {
  try {
    if (!config || !config.bot) return 'Lylia';
    
    return pageName 
      ? getConfig(`meta.pageTitles.${pageName}`, `${pageName.charAt(0).toUpperCase() + pageName.slice(1)} - ${config.bot.name}`)
      : getConfig('meta.title', config.bot.name);
  } catch (error) {
    return 'Lylia';
  }
}

export function getPageDescription(pageName = '') {
  try {
    return pageName 
      ? getConfig(`meta.pageDescriptions.${pageName}`, getConfig('meta.defaultDescription', ''))
      : getConfig('meta.defaultDescription', '');
  } catch (error) {
    return '';
  }
}

export function getFeatureById(featureId) {
  try {
    const features = getConfig('features', []);
    return features.find(feature => feature && feature.id === featureId) || null;
  } catch (error) {
    return null;
  }
}

export function getSocialLink(platform) {
  return getConfig(`urls.social.${platform}`, '#');
}

export function getBotName(includeSymbol = true) {
  try {
    return includeSymbol 
      ? getConfig('bot.name', 'Lylia')
      : getConfig('bot.nameWithoutSymbol', 'Lylia');
  } catch (error) {
    return includeSymbol ? 'Lylia' : 'Lylia';
  }
}

export function getDiscordLinks() {
  try {
    return {
      invite: getConfig('urls.discord.invite', ''),
      supportServer: getConfig('urls.discord.supportServer', '')
    };
  } catch (error) {
    return { invite: '', supportServer: '' };
  }
}

export function getTeamMembers(type = 'developers') {
  return getConfig(`team.${type}`, []);
}

export function getLegalInfo(section) {
  return getConfig(`legal.${section}`, {});
}

export function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}