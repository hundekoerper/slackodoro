'use strict';

const m = require('mithril');
const config = require('../config');

module.exports = (scope) => {
  return m('aside', {
    'data-dialog-open': scope.addTaskDialogOpen.toString()
  }, [
    m('h2', 'Start a Task'),
    m('form', {
      onsubmit: (e) => {
        e.preventDefault();
        scope.setTimer(config.pomodoroDuration.value);
        scope.addTaskDialogOpen = false;
      }
    }, [
      m('input', {
        placeholder: 'Enter a name for your task',
        autofocus: true,
        value: scope.currentTaskName,
        oninput: (e) => {
          scope.currentTaskName = e.target.value;
        }
      }),
      m('button[type="submit"]', {
        disabled: !scope.currentTaskName
      }, 'Add'),
      m('button[type="button"]', {
        onclick: (e) => {
          e.preventDefault();
          scope.currentTaskName = '';
          scope.addTaskDialogOpen = false;
        }
      }, 'Cancel')
    ])
  ]);
};
