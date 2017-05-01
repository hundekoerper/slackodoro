'use strict';

const m = require('mithril');
const config = require('../config');

const formatTime = require('../util/formatTime');

function checkBoxWidget(property) {
  const options = {
    className: 'sd-checkbox__input',
    checked: config[property].value,
    onclick: m.withAttr('checked', () => {
      config[property].value = !config[property].value;
    })
  };
  return m('label', {className: 'sd-checkbox'},[
    m('input[type="checkbox"]', options),
    m('span', { className: 'sd-checkbox__text'}, `${config[property].label}`)
  ]);
}

function rangeWidget(property) {
  const options = {
    className: 'sd-range__input',
    min: 30,
    step: 30,
    max: 2700,
    value: config[property].value,
    oninput: () => {
      config[property].value = event.target.value;
    }
  };
  return m('label', {className: 'sd-range'}, [
    m('span', {
      className: 'sd-range__label'
    }, `${config[property].label}: ${formatTime(config[property].value)}min`),
    m('input[type="range"]', options)
  ]);
}

module.exports = function(scope) {
  return m('aside', {
    className: 'sd-modal',
    'data-dialog-open': scope.settingDialogOpen.toString()
  }, m('div', {
      className: 'sd-modal__content'
    }, [
      m('h2', { className: 'sd-headline' }, 'Settings'),
      checkBoxWidget('silentNotification'),
      rangeWidget('pomodoroDuration'),
      rangeWidget('shortBreakDuration'),
      rangeWidget('longBreakDuration')
    ])
  );
};
