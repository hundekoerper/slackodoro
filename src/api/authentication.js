/* global fetch */

const { BrowserWindow } = require('electron').remote;
const qs = require('qs');

/* eslint-disable camelcase */
const credentials = {
  client_id: '',
  client_secret: '',
  scopes: 'users.profile:write',
};

function parseQueryStringsFromUrl(url) {
  const queryStringParams = url.split('?')[1];
  return qs.parse(queryStringParams);
}

function requestAccessToken(code) {
  const urlParams = {
    client_id: credentials.client_id,
    client_secret: credentials.client_secret,
    code,
  };
  return fetch(`https://slack.com/api/oauth.access?${qs.stringify(urlParams)}`, {
    method: 'POST',
  }).then(res => res.json());
}

function handleNavigation(url) {
  return new Promise((resolve, reject) => {
    const urlParams = parseQueryStringsFromUrl(url);
    if (urlParams.error) {
      reject(urlParams.error);
    } else if (urlParams.code) {
      resolve(urlParams.code);
    }
  });
}

function saveTokenToStorage(response) {
  if (!response.ok) {
    throw new Error(response.error);
  }
  const accessToken = response.access_token;
  window.localStorage.setItem('slacktoken', accessToken);
}

module.exports = () => {
  const authWindow = new BrowserWindow({
    width: 500,
    height: 600,
    show: true,
  });
  const urlParams = {
    client_id: credentials.client_id,
    scope: credentials.scopes,
  };
  const authUrl = `https://slack.com/oauth/authorize?${qs.stringify(urlParams)}`;

  authWindow.webContents.on('will-navigate', (event, url) => {
    handleNavigation(url)
      .then(requestAccessToken)
      .then(saveTokenToStorage)
      .then(() => {
        authWindow.removeAllListeners('close');
        authWindow.close();
      })
      .catch((err) => { console.error(err); });
  });

  authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
    handleNavigation(newUrl)
      .then(requestAccessToken)
      .then(saveTokenToStorage)
      .then(() => {
        authWindow.removeAllListeners('close');
        authWindow.close();
      })
      .catch((err) => { console.error(err); });
  });

  authWindow.loadURL(authUrl);
  authWindow.on('close', () => {
    throw new Error('Auth window was closed by the user');
  }, false);
};
