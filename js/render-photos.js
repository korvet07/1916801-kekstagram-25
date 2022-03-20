import { openBigPhoto } from './event-handler.js';
const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const elementFragment = document.createDocumentFragment();
const renderThumbnail = (item) => {
  const thumbnail = template.cloneNode(true);
  thumbnail.querySelector('.picture__img').setAttribute('src', item.url);
  thumbnail.querySelector('.picture__likes').textContent = item.likes;
  thumbnail.querySelector('.picture__comments').textContent = item.comments.length;
  return thumbnail;
};
export const bigPhoto = document.querySelector('.big-picture');
export const renderPhotos = (items) => {
  items.forEach((item) => {
    const thumbnail = renderThumbnail(item);
    thumbnail.addEventListener('click', () => {
      bigPhoto.querySelector('.big-picture__img>img').setAttribute('src', item.url);
      bigPhoto.querySelector('.likes-count').textContent = item.likes;
      bigPhoto.querySelector('.comments-count').textContent = item.comments.length;
      bigPhoto.querySelector('.social__caption').textContent = item.description;
      bigPhoto.querySelectorAll('.social__comment>img')[0].setAttribute('src', item.comments[0].avatar);
      bigPhoto.querySelectorAll('.social__comment>img')[1].setAttribute('src', item.comments[1].avatar);
      bigPhoto.querySelectorAll('.social__comment>img')[0].setAttribute('alt', item.comments[0].name);
      bigPhoto.querySelectorAll('.social__comment>img')[1].setAttribute('alt', item.comments[1].name);
      bigPhoto.querySelectorAll('.social__text')[0].textContent = item.comments[0].message;
      bigPhoto.querySelectorAll('.social__text')[1].textContent = item.comments[1].message;
    });
    thumbnail.addEventListener('click', () => {
      openBigPhoto(bigPhoto);
    });
    elementFragment.append(thumbnail);
  });
  return container.append(elementFragment);
};
