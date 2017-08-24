

const m = require('mithril');
const fs = require('fs');

const icons = {
  add: fs.readFileSync('./src/icons/add.svg', 'utf8'),
  play: fs.readFileSync('./src/icons/play.svg', 'utf8'),
  pause: fs.readFileSync('./src/icons/pause.svg', 'utf8'),
  settings: fs.readFileSync('./src/icons/settings.svg', 'utf8'),
  signin: fs.readFileSync('./src/icons/signin.svg', 'utf8'),
  stop: fs.readFileSync('./src/icons/stop.svg', 'utf8'),
};

module.exports = (name, attrs = {}) => m('icon', attrs, m.trust(icons[name]));
