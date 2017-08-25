/* global window */

const m = require('mithril');
const config = require('../config');

module.exports = scope => m('aside', {
  className: 'sd-modal',
  'data-dialog-open': scope.addTaskDialogOpen.toString(),
}, [
  m('div', { className: 'sd-modal__content' }, [
    m('h2', { className: 'sd-headline' }, 'Start a Task'),
    m('form', {
      onsubmit: (e) => {
        e.preventDefault();
        scope.setTimer(config.pomodoroDuration.value);
        scope.addTaskDialogOpen = false;
      },
    }, [
      m('input', {
        placeholder: 'Enter a name for your task',
        className: 'sd-input',
        autofocus: true,
        value: scope.currentTaskName,
        oninput: (e) => {
          scope.currentTaskName = e.target.value;
        },
      }),
      m('div', { className: 'sd-button-group' }, [
        m('button[type="button"]', {
          className: 'sd-button sd-button--secondary',
          onclick: (e) => {
            e.preventDefault();
            scope.currentTaskName = '';
            scope.addTaskDialogOpen = false;
          },
        }, 'Cancel'),
        m('button[type="submit"]', {
          className: 'sd-button',
          disabled: !scope.currentTaskName,
        }, 'Add'),
      ]),
    ]),
  ]),

]);
