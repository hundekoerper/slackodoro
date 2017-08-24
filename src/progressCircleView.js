

const m = require('mithril');

const SIZE = 420;
const MAX_DASH = SIZE * 3;

const strokeColor = '#FFFFFF';
const strokeWidth = 10;

const groupProperties = {
  stroke: 'none',
  'stroke-width': 1,
  fill: 'none',
  'fill-rule': 'evenodd',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
};

const backgroundStrokeProperties = {
  stroke: strokeColor,
  'stroke-width': strokeWidth,
  opacity: '0.5',
  'stroke-dasharray': 1,
  cx: SIZE / 2,
  cy: SIZE / 2,
  r: SIZE / 2 - strokeWidth,
};

const progressStrokeProperties = {
  stroke: strokeColor,
  'stroke-width': strokeWidth,
  'stroke-dasharray': `0,${MAX_DASH}`,
  cx: SIZE / 2,
  cy: SIZE / 2,
  r: SIZE / 2 - strokeWidth,
};

function calculateDashArrayProgress(fullTime, currentTime) {
  const timeProgress = fullTime - currentTime;
  const currentPercentage = Math.floor((timeProgress * 100) / fullTime);
  const currentDash = (MAX_DASH / 100) * currentPercentage;
  return `${currentDash},${MAX_DASH}`;
}

module.exports = scope => m('svg', {
  class: 'progressbar',
  width: `${SIZE}px`,
  height: `${SIZE}px`,
  viewBox: `0 0 ${SIZE} ${SIZE}`,
}, [
  m('g', groupProperties, [
    m('circle', backgroundStrokeProperties),
    m('circle', Object.assign({}, progressStrokeProperties, {
      'stroke-dasharray': calculateDashArrayProgress(scope.currentDuration, scope.time),
    })),
  ]),
]);
