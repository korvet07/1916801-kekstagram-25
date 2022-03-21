import { renderBigPhoto } from './big-photo.js';
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
export const renderPhotos = (items) => {
  items.forEach((item) => {
    const thumbnail = renderThumbnail(item);
    thumbnail.addEventListener('click', () => {
      renderBigPhoto(item);
    });
    elementFragment.append(thumbnail);
  });
  return container.append(elementFragment);
};
