const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
const MESSAGE_COMMENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const COLLECTION_DESCRIPTIONS = 25;
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
const getRandomArrayElement = (element) => element[getRandomIntInclusive(0, element.length - 1)];


function makeCount() {
  let sumCount = 0;
  return  (n) => {
    sumCount = sumCount >= n ? 1 : sumCount += 1;
    return sumCount;
  };
}
const makeCountIdComment = makeCount();
const makeCountIdDescription = makeCount();
const makeCountValueFoto = makeCount();
const createComments = () => ({
  id: makeCountIdComment(150),
  avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGE_COMMENT),
  name: getRandomArrayElement(NAMES),
});
const createDescriptionsFoto = () => ({
  id: makeCountIdDescription(25),
  url: `photos/${makeCountValueFoto(25)}.jpg`,
  description: 'Это мы на Гаваях)',
  likes: getRandomIntInclusive(15, 200),
  comments: Array.from({length:6}, createComments),
});
const collectionDescriptionsFoto = Array.from({ length: COLLECTION_DESCRIPTIONS }, createDescriptionsFoto);
window.console.log(collectionDescriptionsFoto);
