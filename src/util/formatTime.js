

function padWithZeros(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

module.exports = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${padWithZeros(minutes)}:${padWithZeros(seconds)}`;
};
