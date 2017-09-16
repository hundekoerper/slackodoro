let currentTimeout;
let running = false;

function startInterval(fn, interval) {
  let nextExecution = Date.now() + interval;
  running = true;

  function tick() {
    const deviation = Date.now() - nextExecution;
    fn();
    nextExecution = nextExecution + interval;
    if (running) {
      currenTimeout = setTimeout(tick, Math.max(0, interval - deviation));
    }
  }

  fn();
  currentTimeout = setTimeout(tick, interval);
}

function clearInterval() {
  running = false;
  clearTimeout(currentTimeout);
}

module.exports = {
  start: startInterval,
  clear: clearInterval
}
