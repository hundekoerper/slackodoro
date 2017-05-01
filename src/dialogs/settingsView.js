'use strict';

const m = require('mithril');
const config = require('../config');

const formatTime = require('../util/formatTime');

function checkBoxWidget(property) {
  const options = {
    checked: config[property].value,
    onclick: m.withAttr('checked', () => {
      config[property].value = !config[property].value;
    })
  };
  return m('span', [
    m('label', `${config[property].label}`),
    m('input[type="checkbox"]', options)
  ]);
}

function rangeWidget(property) {
  const options = {
    min: 1,
    step: 1,
    max: 2700,
    value: config[property].value,
    oninput: () => {
      config[property].value = event.target.value;
    }
  };
  return [
    m('label', `${config[property].label}: ${formatTime(config[property].value)}s`),
    m('input[type="range"]', options)
  ];
}

module.exports = function(scope) {
  return m('aside', {
    'data-dialog-open': scope.settingDialogOpen.toString()
  }, [
    m('h2', 'Settings'),
    checkBoxWidget('silentNotification'),
    rangeWidget('pomodoroDuration'),
    rangeWidget('shortBreakDuration'),
    rangeWidget('longBreakDuration')
  ]);
};
