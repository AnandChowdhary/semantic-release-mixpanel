/**
 * Object sent to Mixpanel endpoint
 * @param {String} description the name and content of the release
 * @param {String} username HTTP basic auth username
 * @param {String} password HTTP basic auth password
 */
module.exports = (description, username, password) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Basic " + Buffer.from(username + ":" + password).toString("base64"),
  },
  body: JSON.stringify({
    date: new Date().toISOString().substring(0, 19).replace("T", " "),
    description,
  }),
});
