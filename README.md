# 📦🚀📊 Semantic Release Mixpanel

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Create Mixpanel annotations from new releases.

| Step               | Description                                                                     |
| ------------------ | ------------------------------------------------------------------------------- |
| `verifyConditions` | Verify the required environment variables                                       |
| `success`          | Create an annotation in Mixpanel with information about the most recent release |
| `fail`             | (nothing)                                                                       |

## Installation

```sh
npm install --save-dev semantic-release-mixpanel
```

## Usage

Add the following to your `release.config.js`

```js
  "plugins": [
    // ...
   ["semantic-release-mixpanel", {
       "semverFilter": ["major", "minor"]
   }]
  ],
```

## Environment variables

Your Mixpanel project ID along with Service Account credentials are required. To learn how to create a service account, see [Mixpanel Docs](https://developer.mixpanel.com/reference/service-accounts).

| Environment variable                | Description                     |
| ----------------------------------- | ------------------------------- |
| `MIXPANEL_PROJECT_ID`               | Project ID available in the URL |
| `MIXPANEL_SERVICE_ACCOUNT_USERNAME` | Username                        |
| `MIXPANEL_SERVICE_ACCOUNT_PASSWORD` | Password                        |

## Options

| Property           | Type       | Default                       | Example                              | Description                                                                              |
| ------------------ | ---------- | ----------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------- |
| `skipCommit`       | `String`   | `undefined`                   | `"skipCommit": "^fix\\(deps\\):"`    | Skips notifying when `regex` matches at least one commit in the release                  |
| `semverFilter`     | `String[]` | `["major", "minor", "patch"]` | `"semverFilter": ["major", "minor"]` | Skips releases that do not match one of the configured types                             |
| `fullReleaseNotes` | `Boolean`  | `false`                       | `"fullReleaseNotes": true`           | Provides the full release notes in the annotation instead of a link to the release notes |

## License

- [MIT](./LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)
- Forked from [intuit/semantic-release-slack](https://github.com/intuit/semantic-release-slack)
