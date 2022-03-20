import { openBigPhoto } from './full-screen-photos.js';
const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const elementFragment = document.createDocumentFragment();
const renderElement = (item) => {
  const element = template.cloneNode(true);
  element.querySelector('.picture__img').setAttribute('src', item.url);
  element.querySelector('.picture__likes').textContent = item.likes;
  element.querySelector('.picture__comments').textContent = item.comments.length;
  return element;
};
export const bigPhoto = document.querySelector('.big-picture');
export const renderPhotos = (items) => {
  items.forEach((item) => {
    window.console.log(bigPhoto.querySelectorAll('.social__comment>img'));
    const element = renderElement(item);
    element.addEventListener('click', () => {
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
    element.addEventListener('click', () => {
      openBigPhoto(bigPhoto);
    });
    elementFragment.append(element);
  });
  return container.append(elementFragment);
};
