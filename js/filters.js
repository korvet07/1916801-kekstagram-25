const buttonDefault = document.querySelector('#filter-default');
const buttonRandom = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');
window.onload = () => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};
export const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
const onButtonClick = (evt, cb) => {
  document.querySelectorAll('.img-filters__button').forEach((button) => button.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
  return cb();
};

export const onRenderRandomPhotos = (cb) => {
  buttonRandom.addEventListener('click', (evt) => {
    onButtonClick(evt, cb);
  });
};
export const onRenderDefaultPhotos = (cb) => {
  buttonDefault.addEventListener('click', (evt) => {
    onButtonClick(evt, cb);
  });
};
export const onRenderDiscussedPhotos = (cb) => {
  buttonDiscussed.addEventListener('click', (evt) => {
    onButtonClick(evt, cb);
  });
};
