import { getNextCommentId, getRandomArrayElement, getRandomIntInclusive } from './util.js';
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
const MESSAGE_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const COLLECTION_DESCRIPTIONS = 25;
const createIdGenerator = () => {
  let sumCount = 0;
  return (n) => sumCount >= n ? 1 : ++sumCount;
};
const makeCountIdDescription = createIdGenerator();
const makeCountValuePhoto = createIdGenerator();
const createComment = () => ({
  id: getNextCommentId(),
  avatar: `img/avatar-${getRandomIntInclusive(1, 5)}.svg`,
  message: getRandomArrayElement(MESSAGE_COMMENTS),
  name: getRandomArrayElement(NAMES),
});
const createDescriptionsPhotos = () => ({
  id: makeCountIdDescription(25),
  url: `photos/${makeCountValuePhoto(25)}.jpg`,
  description: 'Это мы на Гаваях)',
  likes: getRandomIntInclusive(15, 200),
  comments: Array.from({ length: getRandomIntInclusive(13, 25) }, createComment),
});
export const getMockPhotos = () => Array.from({ length: COLLECTION_DESCRIPTIONS }, createDescriptionsPhotos);
