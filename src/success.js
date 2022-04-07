const fetch = require("node-fetch");
const emoji = require("node-emoji");
const debug = require("debug")("semantic-release-mixpanel:success");
// eslint-disable-next-line import/no-dynamic-require
const { pkg } = require("read-pkg-up").sync();
const payload = require("./definitions/payload");

/**
 * A lifecycle method for publishing to Mixpanel when a successful release occurs
 */
module.exports = async (pluginConfig, context) => {
  const { env, nextRelease, releases, logger, commits } = context;
  let githubReleaseNotesUrl = "";
  debug(`The options provided are ${JSON.stringify(pluginConfig, null, 2)}`);

  // Options passed by the user
  const { skipCommit, fullReleaseNotes } = pluginConfig;
  // Types of changes to post for
  const semverFilter = pluginConfig.semverFilter || ["major", "minor", "patch"];
  // Check to see if the filter matches any types
  const semverFilterIncludesType = semverFilter.includes(nextRelease.type);
  // Skip posting if the skip commit is provided
  const hasSkipCommit =
    skipCommit &&
    commits.some((commit) => {
      return commit.subject.match(new RegExp(skipCommit));
    });
  debug(`hasSkipCommit=${hasSkipCommit}`);
  if (hasSkipCommit) {
    logger.log(
      'Skipping posting Mixpanel message due to matching "skipCommit" commit message'
    );
    return;
  }
  debug(`semverFilterIncludesType=${semverFilterIncludesType}`);
  if (!semverFilterIncludesType) {
    logger.log(
      `Skipping posting Mixpanel message due to semverFilter not containing a matching "${nextRelease.type}" item.`
    );
    return;
  }

  releases.forEach((release) => {
    // We want to grab the info from the github plugin
    if (release.pluginName.includes("github")) {
      githubReleaseNotesUrl = fullReleaseNotes
        ? release.notes
        : `${emoji.get("spiral_note_pad")} Release Notes: ${release.url}`;
    }
  });

  const MixpanelMessage = `${pkg.name}@${nextRelease.version}: ${githubReleaseNotesUrl}`;

  debug(`The message to post to Mixpanel is ${MixpanelMessage}`);
  const URL = `https://mixpanel.com/api/app/projects/${env.MIXPANEL_PROJECT_ID}/annotations`;
  debug(`The Mixpanel webhook is ${URL}`);
  logger.log("Posting release message to Mixpanel");
  await fetch(
    URL,
    payload(
      MixpanelMessage,
      env.MIXPANEL_SERVICE_ACCOUNT_USERNAME,
      env.MIXPANEL_SERVICE_ACCOUNT_PASSWORD
    )
  );
};
