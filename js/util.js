function getRandomIntInclusive(min, max) {
  if ((min >= max) || (min < 0 || max < 0)) {
    return 0;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function checkLengthString(checkString, maxLength = 140) {
  return checkString.length <= maxLength;
}
checkLengthString('строка');
const getNextRandomInt = (startNumber = 1, maxStep = 1) => {
  let currentNumber = startNumber;
  return () => {
    const resultNumber = currentNumber;
    currentNumber += getRandomIntInclusive(1, maxStep);
    return resultNumber;
  };
};

export const getNextCommentId = getNextRandomInt(3, 2);
export const getRandomArrayElement = (element) => element[getRandomIntInclusive(0, element.length - 1)];
export {getRandomIntInclusive};
