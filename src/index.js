'use strict';

const m = require('mithril');
const domready = require('domready');
const config = require('./src/config');
const icon = require('./src/icons/icon');
const progressCircleView = require('./src/progressCircleView');

function padWithZeros(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

function showNotification(message) {
  const notification = new Notification('Slackodoro', { body: message });
  notification.silent = config.silentNotification;
  return notification;
}

function timerView(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;
  return m('time', `${padWithZeros(minutes)}:${padWithZeros(seconds)}`);
}

const pomodoroComponent = {
  oninit(vnode) {
    let counter;

    vnode.state = {
      isPaused: true,
      currentDuration: 0,
      time: 0
    };

    vnode.state.startTimer = () => {
      if (!vnode.state.time) {
        return;
      }

      vnode.state.isPaused = false;
      counter = setInterval(() => {
        vnode.state.time--;
        m.redraw();
        if (vnode.state.time === 0) {
          showNotification('Pomodoro done. Time for a break!');
          clearInterval(counter);
        }
      }, 1000);
    };

    vnode.state.pauseTimer = () => {
      vnode.state.isPaused = true;
      clearInterval(counter);
    };

    vnode.state.resetTimer = () => {
      vnode.state.isPaused = true;
      clearInterval(counter);
      vnode.state.time = vnode.state.currentDuration;
    };

    vnode.state.setTimer = (duration) => {
      vnode.state.currentDuration = duration;
      vnode.state.resetTimer();
    };
  },
  view(vnode) {
    return m('main', [
      m('content', [
        progressCircleView(vnode.state),
        timerView(vnode.state.time),
      ]),
      m('nav', [
        vnode.state.isPaused
          ? icon('play', { onclick: vnode.state.startTimer })
          : icon('pause', { onclick: vnode.state.pauseTimer }),
        icon('stop', { onclick: vnode.state.resetTimer })
      ]),
      m('.durationSelection', [
        m('button[type="button"]', { onclick: () => { vnode.state.setTimer(config.pomodoroDuration); } }, 'Pomodoro'),
        m('button[type="button"]', { onclick: () => { vnode.state.setTimer(config.shortBreakDuration); } }, 'Short break'),
        m('button[type="button"]', { onclick: () => { vnode.state.setTimer(config.longBreakDuration); } }, 'Long Break')
      ])
    ]);
  }
};

domready(() => m.mount(document.body, pomodoroComponent));
