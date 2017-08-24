/* global fetch window */
const qs = require('qs');

module.exports = function setSlackStatus(statusText) {
  /* eslint-disable camelcase */
  const status = {
    status_text: statusText,
    status_emoji: ':tomato:',
  };

  const urlParams = {
    profile: encodeURIComponent(JSON.stringify(status)),
    token: window.localStorage.getItem('slacktoken'),
  };

  fetch(`https://slack.com/api/user.profile.set?${qs.stringify(urlParams)}`, {
    method: 'POST',
  });
};
