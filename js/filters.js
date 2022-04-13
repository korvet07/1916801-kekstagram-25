import { renderPhotos } from './render-photos.js';
const SHOW_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;
const buttonDefault = document.querySelector('#filter-default');
const buttonRandom = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');
window.onload = () => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};
const onButtonClick = (evt) => {
  document.querySelectorAll('.img-filters__button').forEach((button) => button.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
  document.querySelectorAll('.picture').forEach((picture) => picture.remove());
};
export const onAlternativeRenders = (data) => {
  buttonDefault.addEventListener('click', (evt) => {
    setTimeout(() => {
      onButtonClick(evt);
      renderPhotos(data.slice());
    }, RERENDER_DELAY);
  });
  buttonRandom.addEventListener('click', (evt) => {
    setTimeout(() => {
      onButtonClick(evt);
      const randomPhotos = data.slice().sort(() => Math.random() - 0.5).slice(0, SHOW_RANDOM_PHOTOS);
      renderPhotos(randomPhotos);
    }, RERENDER_DELAY);
  });
  buttonDiscussed.addEventListener('click', (evt) => {
    setTimeout(() => {
      onButtonClick(evt);
      const discussedPhotos = data.slice().sort((a, b) => {
        if (a.comments === b.comments) {
          return 0;
        }
        return a.comments < b.comments ? 1 : -1;
      });
      renderPhotos(discussedPhotos);
    }, RERENDER_DELAY);
  });
};
