const AggregateError = require("aggregate-error");
const debug = require("debug")("semantic-release-mixpanel:verify");
const resolveConfig = require("./resolve-config");
const getError = require("./get-error");

/**
 * A method to verify that the user has given us a Mixpanel service ID to post to
 */
module.exports = async (pluginConfig, context) => {
  const { logger } = context;
  const errors = [];
  const {
    mixpanelProjectId,
    mixpanelServiceAccountUsername,
    mixpanelServiceAccountPassword,
  } = resolveConfig(pluginConfig, context);
  // Validates we have a service ID
  debug("Validating MIXPANEL_PROJECT_ID exists in the environment");
  if (mixpanelProjectId !== null) {
    logger.log("Verify Mixpanel Project ID Provided");
  } else {
    // Pushes an error if we are not provided a proper service ID
    debug(
      "MIXPANEL_PROJECT_ID failed validation, see error message for more details"
    );
    errors.push(getError("EMISSINGMIXPANELSERVICEID", {}));
  }

  // Validates we have a service account username
  debug(
    "Validating MIXPANEL_SERVICE_ACCOUNT_USERNAME exists in the environment"
  );
  if (mixpanelServiceAccountUsername !== null) {
    logger.log("Verify Mixpanel Username Provided");
  } else {
    // Pushes an error if we are not provided a proper service ID
    debug(
      "MIXPANEL_SERVICE_ACCOUNT_USERNAME failed validation, see error message for more details"
    );
    errors.push(getError("EMISSINGMIXPANELUSERNAME", {}));
  }

  // Validates we have a service account username
  debug(
    "Validating MIXPANEL_SERVICE_ACCOUNT_PASSWORD exists in the environment"
  );
  if (mixpanelServiceAccountPassword !== null) {
    logger.log("Verify Mixpanel Password Provided");
  } else {
    // Pushes an error if we are not provided a proper service ID
    debug(
      "MIXPANEL_SERVICE_ACCOUNT_PASSWORD failed validation, see error message for more details"
    );
    errors.push(getError("EMISSINGMIXPANELPASSWORD", {}));
  }

  /**
   * Validate if we have fullReleaseNotes passed in, otherwise default to false
   */
  debug("Validating if fullReleaseNotes is set.");
  if (pluginConfig.fullReleaseNotes === undefined) {
    debug("fullReleaseNotes not set, setting it to false");
    // eslint-disable-next-line no-param-reassign
    pluginConfig.fullReleaseNotes = false;
  }

  // Throw any errors we accumulated during the validation
  if (errors.length > 0) {
    throw new AggregateError(errors);
  }
};
