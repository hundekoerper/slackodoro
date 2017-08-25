/* global fetch window Headers */

function setSlackStatus(status) {
  const token = window.localStorage.getItem('slacktoken');

  const payload = `token=${token}&profile=${encodeURI(JSON.stringify(status))}`;

  fetch('https://slack.com/api/users.profile.set', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: payload,
  });
}

/* eslint-disable camelcase */

function set(statusText) {
  const status = {
    status_text: statusText,
    status_emoji: ':tomato:',
  };
  setSlackStatus(status);
}

function unset() {
  const status = {
    status_text: '',
    status_emoji: '',
  };
  setSlackStatus(status);
}

module.exports = {
  set,
  unset,
};
