module.exports = {
  EMISSINGMIXPANELSERVICEID: () => ({
    message: "Missing Mixpanel project ID",
    details: `Mixpanel Project ID is required. Ensure you have the environment variable MIXPANEL_PROJECT_ID set appropriately and try again`,
  }),
  EMISSINGMIXPANELUSERNAME: () => ({
    message: "Missing Mixpanel username",
    details: `Mixpanel Service Account username is required. Ensure you have the environment variable MIXPANEL_SERVICE_ACCOUNT_USERNAME set appropriately and try again`,
  }),
  EMISSINGMIXPANELPASSWORD: () => ({
    message: "Missing Mixpanel password",
    details: `Mixpanel Service Account password is required. Ensure you have the environment variable MIXPANEL_SERVICE_ACCOUNT_PASSWORD set appropriately and try again`,
  }),
};
