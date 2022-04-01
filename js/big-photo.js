const photo = document.querySelector('.big-picture');
const socialComments = photo.querySelector('.social__comments');
const li = photo.querySelector('.social__comment');
const buttonLoaderComments = document.querySelector('.comments-loader');
const buttonCloseBigPhoto = photo.querySelector('#picture-cancel');
const socialCommentsCount = document.querySelector('.social__comment-count');
const LIMIT_DISPLAYED_COMMENTS = 5;
let offSet = 0;
let viewedComments = [];
const getNewSocialComments = (n) => {
  for (let i = 1; i <= n; i++) {
    socialComments.append(li.cloneNode(true));
  }
  return socialComments;
};
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
const renderPhoto = (item) => {
  document.querySelector('.big-picture__img>img').setAttribute('src', item.url);
  document.querySelector('.likes-count').textContent = item.likes;
  document.querySelector('.social__caption').textContent = item.description;
};
const renderTextComments = function (item) {
  for (let i = 0; i < viewedComments.length; i++) {
    document.querySelectorAll('.social__comment>img')[i + offSet].setAttribute('src', item.comments[i + offSet].avatar);
    document.querySelectorAll('.social__comment>img')[i + offSet].setAttribute('alt', item.comments[i + offSet].name);
    document.querySelectorAll('.social__text')[i + offSet].textContent = item.comments[i + offSet].message;
  }
};
const controlShowAmountComments = (item) => {
  socialCommentsCount.innerHTML = `${offSet} из <span class="comments-count">${item.comments.length}</span> комментариев`;
};
const controlRenderComments = (item) => {
  viewedComments = item.comments.slice(offSet, offSet + LIMIT_DISPLAYED_COMMENTS);
  getNewSocialComments(viewedComments.length);
  renderTextComments(item);
  offSet = offSet + viewedComments.length;
  controlShowAmountComments(item);
  if (viewedComments.length < LIMIT_DISPLAYED_COMMENTS || (viewedComments.length === LIMIT_DISPLAYED_COMMENTS && offSet === item.comments.length)) {
    buttonLoaderComments.classList.add('hidden');
  } else {
    buttonLoaderComments.classList.remove('hidden');
  }
};
export const renderBigPhoto = (item) => {
  renderPhoto(item);
  socialComments.innerHTML = '';
  controlRenderComments(item);
  const onButtonLoaderCommentsClick = () => {
    controlRenderComments(item);
  };
  buttonLoaderComments.addEventListener('click', onButtonLoaderCommentsClick);
  buttonCloseBigPhoto.addEventListener('click', () => {
    offSet = 0;
    viewedComments.length = 0;
    buttonLoaderComments.removeEventListener('click', onButtonLoaderCommentsClick);
    closeBigPhoto();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      offSet = 0;
      viewedComments.length = 0;
      buttonLoaderComments.removeEventListener('click', onButtonLoaderCommentsClick);
    }
  });
};
