'use strict';

const m = require('mithril');

module.exports = (scope) => {
  return m('aside', {
    'data-dialog-open': scope.addTaskDialogOpen.toString()
  });
};
