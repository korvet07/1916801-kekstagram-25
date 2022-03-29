const getRandomIntInclusive = (min, max) => {
  if ((min >= max) || (min < 0 || max < 0)) {
    return 0;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const createRandomCommentId = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomIntInclusive(min, max);
    if (previousValues.length >= (max - min + 1)) {
      window.console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return 0;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomIntInclusive(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};
export const getNextCommentId = createRandomCommentId(1, 625);
export const getRandomArrayElement = (element) => element[getRandomIntInclusive(0, element.length - 1)];
export { getRandomIntInclusive };
