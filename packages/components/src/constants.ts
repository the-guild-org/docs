const siteBaseUrl = 'https://the-guild.dev';

export const siteUrl = process.env.SITE_URL;

/**
 * Used in header and footer links to either have `https://the-guild.dev` prefix or `/`
 */
export const siteOrigin = siteUrl === siteBaseUrl ? '' : siteBaseUrl;
