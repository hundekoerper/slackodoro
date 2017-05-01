'use strict';

function padWithZeros(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

module.exports = (timeInSeconds) => {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;
  return `${padWithZeros(minutes)}:${padWithZeros(seconds)}`;
};
