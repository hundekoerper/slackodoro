

const m = require('mithril');
const domready = require('domready');

const config = require('./src/config');
const icon = require('./src/icons/icon');

const interval = require('./src/util/interval');
const formatTime = require('./src/util/formatTime');

const progressCircleView = require('./src/progressCircleView');
const settingsView = require('./src/dialogs/settingsView');
const addTaskView = require('./src/dialogs/addTaskView');

const slackStatus = require('./src/api/slackStatus');

function showNotification(message) {
  return new Notification('Slackodoro', {
    body: message,
    silent: config.silentNotification.value,
  });
}

const pomodoroComponent = {
  oninit(vnode) {
    let counter;

    vnode.state = {
      isPaused: true,
      currentDuration: 0,
      currentTaskName: '',
      time: 0,
      addTaskDialogOpen: false,
      settingDialogOpen: false,
    };

    vnode.state.startTimer = () => {
      const token = window.localStorage.getItem('slacktoken');

      if (!vnode.state.time) {
        return;
      }

      if (vnode.state.currentTaskName && token) {
        slackStatus.set(vnode.state.currentTaskName);
      }

      vnode.state.isPaused = false;
      interval.start(() => {
        vnode.state.time--;
        m.redraw();
        if (vnode.state.time === 0) {
          showNotification('Pomodoro done. Time for a break!');
          vnode.state.resetTimer();
          m.redraw();
        }
      }, 1000);
    };

    vnode.state.pauseTimer = () => {
      vnode.state.isPaused = true;
      interval.clear();
    };

    vnode.state.resetTimer = () => {
      vnode.state.isPaused = true;
      interval.clear();
      vnode.state.time = vnode.state.currentDuration;
      slackStatus.unset();
    };

    vnode.state.setTimer = (duration) => {
      vnode.state.currentDuration = duration;
      vnode.state.resetTimer();
    };
  },
  view(vnode) {
    return m('main', [
      m('section', [
        icon('add', {
          onclick: () => {
            vnode.state.settingDialogOpen = false;
            vnode.state.addTaskDialogOpen = !vnode.state.addTaskDialogOpen;
          },
        }),
        icon('settings', {
          onclick: () => {
            vnode.state.addTaskDialogOpen = false;
            vnode.state.settingDialogOpen = !vnode.state.settingDialogOpen;
          },
        }),
      ]),
      m('content', [
        progressCircleView(vnode.state),
        m('time', formatTime(vnode.state.time)),
        m('h3', vnode.state.currentTaskName),
      ]),
      m('nav', [
        vnode.state.isPaused
          ? icon('play', { onclick: vnode.state.startTimer })
          : icon('pause', { onclick: vnode.state.pauseTimer }),
        icon('stop', { onclick: vnode.state.resetTimer }),
      ]),
      m('.durationSelection', [
        m('button[type="button"]', { onclick: () => { vnode.state.setTimer(config.pomodoroDuration.value); } }, 'Pomodoro'),
        m('button[type="button"]', { onclick: () => { vnode.state.setTimer(config.shortBreakDuration.value); } }, 'Short break'),
        m('button[type="button"]', { onclick: () => { vnode.state.setTimer(config.longBreakDuration.value); } }, 'Long Break'),
      ]),
      addTaskView(vnode.state),
      settingsView(vnode.state),
    ]);
  },
};

domready(() => m.mount(document.body, pomodoroComponent));
