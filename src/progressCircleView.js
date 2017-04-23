'use strict';

const m = require('mithril');

const MAX_DASH = 1680;
const strokeColor = '#FFFFFF';

const groupProperties = {
  stroke: 'none',
  'stroke-width': 1,
  fill: 'none',
  'fill-rule': 'evenodd',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round'
};

const backgroundStrokeProperties = {
  stroke: strokeColor,
  'stroke-width': 10,
  opacity: '0.5',
  'stroke-dasharray': 1,
  cx: 210,
  cy: 210,
  r: 200
};

const progressStrokeProperties = {
  stroke: strokeColor,
  'stroke-width': 10,
  'stroke-dasharray': '0,1680',
  cx: 210,
  cy: 210,
  r: 200
};

function calculateDashArrayProgress(fullTime, currentTime) {
  const timeProgress = fullTime - currentTime;
  const currentPercentage = Math.floor((timeProgress * 100) / fullTime);
  const currentDash = (MAX_DASH / 100) * currentPercentage;
  return `${currentDash},${MAX_DASH}`;
}

module.exports = (scope) => {
  return m('svg', {
    class: 'progressbar',
    width: '420px',
    height: '420px',
    viewBox: '0 0 420 420'
  }, [
    m('g', groupProperties, [
      m('circle', backgroundStrokeProperties),
      m('circle', Object.assign({}, progressStrokeProperties, {
        'stroke-dasharray': calculateDashArrayProgress(scope.currentDuration, scope.time)
      }))
    ])
  ]);
};
