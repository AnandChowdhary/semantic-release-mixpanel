/**
 * Used to extract certain important variables from the context and config that
 * semantic-release passes us
 */
module.exports = (pluginConfig, { env }) => ({
  mixpanelProjectId: env.MIXPANEL_PROJECT_ID || null,
  mixpanelServiceAccountUsername: env.MIXPANEL_SERVICE_ACCOUNT_USERNAME || null,
  mixpanelServiceAccountPassword: env.MIXPANEL_SERVICE_ACCOUNT_PASSWORD || null,
});
