'use strict';

const m = require('mithril');
const domready = require('domready');

const pomodoroDuration = 1500;
const shortBreakDuration = 300;
const longBreakDuration = 900;

function timerView(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;
  return m('time', `${minutes}:${seconds}`);
}

const pomodoroComponent = {
  oninit(vnode) {
    vnode.state.time = 0;
    vnode.state.countdown = () => {
      const counter = setInterval(() => {
        vnode.state.time--;
        m.redraw();
        if (vnode.state.time === 0) {
          clearInterval(counter);
        }
      }, 1000);
    };
  },
  view(vnode) {
    return m('main', [
      m('h1', 'Pomodoro Timer'),
      m('nav', [
        m('button[type="button"]', { onclick: () => { vnode.state.time = pomodoroDuration; } }, 'Pomodoro'),
        m('button[type="button"]', { onclick: () => { vnode.state.time = shortBreakDuration; } }, 'Short break'),
        m('button[type="button"]', { onclick: () => { vnode.state.time = longBreakDuration; } }, 'Long Break')
      ]),
      timerView(vnode.state.time),
      m('nav', [
        m('button[type="button"]', {
          onclick: () => {
            vnode.state.countdown(vnode.state.time);
          }
        }, 'Start'),
        m('button[type="button"]', {}, 'Pause'),
        m('button[type="button"]', {
          onclick: () => { vnode.state.time = 0; }
        }, 'Reset')
      ])
    ]);
  }
};

domready(() => m.mount(document.body, pomodoroComponent));
