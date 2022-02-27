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

let sumIndexFoto = 0;
function getIndexFoto(n) {
  sumIndexFoto = sumIndexFoto >= n ? 1 : sumIndexFoto += 1;
  return sumIndexFoto;
}
let sumIdComments = 0;
function getIdComments(m) {
  sumIdComments = sumIdComments >= m ? 1 : sumIdComments += 1;
  return sumIdComments;
}
let sumIdDescriptions = 0;
function getIdDescriptions(i) {
  sumIdDescriptions = sumIdDescriptions >= i ? 1 : sumIdDescriptions += 1;
  return sumIdDescriptions;
}
const createComments = () => ({
  id: getIdComments(150),
  avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGE_COMMENT),
  name: getRandomArrayElement(NAMES),
});
const createDescriptionsFoto = () => ({
  id: getIdDescriptions(25),
  url: `photos/${getIndexFoto(25)}.jpg`,
  description: 'Это мы на Гаваях)',
  likes: getRandomIntInclusive(15, 200),
  comments: Array.from({length:6}, createComments),
});
const collectionDescriptionsFoto = Array.from({ length: COLLECTION_DESCRIPTIONS }, createDescriptionsFoto);

