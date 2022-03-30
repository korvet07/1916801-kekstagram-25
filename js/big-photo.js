const photo = document.querySelector('.big-picture');
const socialComments = photo.querySelector('.social__comments');
const buttonLoaderComments = document.querySelector('.comments-loader');
const buttonCloseBigPhoto = photo.querySelector('#picture-cancel');
const amountShownComments = document.getElementsByClassName('social__comment');
const socialCommentsCount = document.querySelector('.social__comment-count');
let viewedComments = [];
const LIMIT_DISPLAYED_COMMENTS = 5;
const CORRECTED_DISPLAYED_COMMENTS = 4;
const CORRECTED_DISPLAYED_ELEMENT_DOM = 3;
// значение n - недостающее количество узлов DOM(LI) для отображения 5 комментариев при открытии bigPhoto
const getNewSocialComments = (n) => {
  for (let i = 1; i <= n; i++) {
    socialComments.append(photo.querySelector('.social__comment').cloneNode(true));
  }
  return socialComments;
};
getNewSocialComments(CORRECTED_DISPLAYED_ELEMENT_DOM);
const closeBigPhoto = () => {
  photo.classList.add('hidden');
  document.body.classList.remove('modal-open');

};
const openBigPhoto = () => {
  photo.classList.remove('hidden');
  document.body.classList.add('modal-open');

};
const onBigPhotoEscKey = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPhoto();
  }
};
const onBigPhotoClick = () => {
  closeBigPhoto();
};
export const setOpenBigPhoto = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      openBigPhoto();
    });
  });
};
export const setCloseBigPhoto = () => {
  if (!photo.matches('hidden')) {
    document.addEventListener('keydown', onBigPhotoEscKey);
    buttonCloseBigPhoto.addEventListener('click', onBigPhotoClick);
  } else {
    document.removeEventListener('keydown', onBigPhotoEscKey);
    buttonCloseBigPhoto.removeEventListener('click', onBigPhotoClick);
  }
};
const renderComments = (item) => {
  document.querySelector('.big-picture__img>img').setAttribute('src', item.url);
  document.querySelector('.likes-count').textContent = item.likes;
  document.querySelector('.social__caption').textContent = item.description;
};
const renderTextComments = function (l, m, item) {
  for (let i = 0; i <= l; i++) {
    document.querySelectorAll('.social__comment>img')[i + m].setAttribute('src', item.comments[i].avatar);
    document.querySelectorAll('.social__comment>img')[i + m].setAttribute('alt', item.comments[i].name);
    document.querySelectorAll('.social__text')[i + m].textContent = item.comments[i].message;
  }
};
export const renderBigPhoto = (item) => {
  const dataComments = item.comments.slice();
  const amountComments = item.comments.length;
  socialCommentsCount.innerHTML = `${amountShownComments.length} из <span class="comments-count">${amountComments}</span> комментариев`;
  renderComments(item);
  renderTextComments(CORRECTED_DISPLAYED_COMMENTS, 0, item);
  const templateComments = socialComments.innerHTML;
  const onButtonLoadCommentsClick = () => {
    viewedComments = viewedComments.concat(item.comments.splice(0, LIMIT_DISPLAYED_COMMENTS));
    if (item.comments.length < LIMIT_DISPLAYED_COMMENTS) {
      getNewSocialComments(item.comments.length);
      renderTextComments(item.comments.length - 1, viewedComments.length, item);
      buttonLoaderComments.classList.add('hidden');
    } else {
      getNewSocialComments(LIMIT_DISPLAYED_COMMENTS);
      renderTextComments(CORRECTED_DISPLAYED_COMMENTS, viewedComments.length, item);
      buttonLoaderComments.classList.remove('hidden');
    }
    socialCommentsCount.innerHTML = `${amountShownComments.length} из <span class="comments-count">${amountComments}</span> комментариев`;
  };
  buttonLoaderComments.addEventListener('click', onButtonLoadCommentsClick);
  buttonCloseBigPhoto.addEventListener('click', () => {
    socialComments.innerHTML = '';
    socialComments.insertAdjacentHTML('beforeend', templateComments);
    item.comments.length = 0;
    item.comments = dataComments.slice();
    buttonLoaderComments.classList.remove('hidden');
    buttonLoaderComments.removeEventListener('click', onButtonLoadCommentsClick);
    viewedComments.length = 0;
  });
};
