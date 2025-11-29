import { sql } from '../index.js';

// Cache for settings to avoid DB calls on every request
let settingsCache = {};
let cacheTimestamp = 0;
const CACHE_DURATION = 60000; // 1 minute

export const getSettings = async (category = null) => {
  // Check cache
  const now = Date.now();
  if (settingsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    if (category) {
      return Object.entries(settingsCache)
        .filter(([key, val]) => val.category === category)
        .reduce((acc, [key, val]) => ({ ...acc, [key]: val.value }), {});
    }
    return settingsCache;
  }

  // Fetch from database
  const settings = await sql`
    SELECT key, value, category, description 
    FROM site_settings
  `;

  settingsCache = settings.reduce((acc, s) => {
    acc[s.key] = { value: s.value, category: s.category, description: s.description };
    return acc;
  }, {});
  cacheTimestamp = now;

  if (category) {
    return Object.entries(settingsCache)
      .filter(([key, val]) => val.category === category)
      .reduce((acc, [key, val]) => ({ ...acc, [key]: val.value }), {});
  }

  return settingsCache;
};

export const getSetting = async (key) => {
  const settings = await getSettings();
  return settings[key]?.value || null;
};

export const updateSetting = async (key, value) => {
  await sql`
    UPDATE site_settings 
    SET value = ${value}, updated_at = CURRENT_TIMESTAMP
    WHERE key = ${key}
  `;
  
  // Clear cache
  settingsCache = {};
  cacheTimestamp = 0;
};

export const updateSettings = async (settingsObj) => {
  for (const [key, value] of Object.entries(settingsObj)) {
    await updateSetting(key, value);
  }
};

// Email settings helpers
export const isEmailVerificationEnabled = async () => {
  const enabled = await getSetting('email_verification_enabled');
  return enabled === 'true';
};

export const getEmailConfig = async () => {
  const settings = await getSettings('email');
  return {
    enabled: settings.email_verification_enabled === 'true',
    provider: settings.email_service_provider || 'gmail',
    fromAddress: settings.email_from_address || 'noreply@polithane.com',
    fromName: settings.email_from_name || 'Polithane',
    smtpUser: settings.email_smtp_user || '',
    smtpPassword: settings.email_smtp_password || '',
  };
};
