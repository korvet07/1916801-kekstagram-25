const photo = document.querySelector('.big-picture');
const socialComments = photo.querySelector('.social__comments');
const li = photo.querySelector('.social__comment');
const buttonLoaderComments = document.querySelector('.comments-loader');
const buttonCloseBigPhoto = photo.querySelector('#picture-cancel');
const socialCommentsCount = document.querySelector('.social__comment-count');
const LIMIT_DISPLAYED_COMMENTS = 5;
let offset = 0;
const img = li.querySelector('img');
const textComment = document.querySelector('.social__text');
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
const controlShowAmountComments = (item) => {
  socialCommentsCount.innerHTML = `${offset} из <span class="comments-count">${item.comments.length}</span> комментариев`;
};
const renderContentPhoto = (item) => {
  document.querySelector('.big-picture__img>img').setAttribute('src', item.url);
  document.querySelector('.likes-count').textContent = item.likes;
  document.querySelector('.social__caption').textContent = item.description;
};
const renderContentComments = (item) => {
  const fragment = new DocumentFragment();
  item.comments.slice(offset, offset + LIMIT_DISPLAYED_COMMENTS).forEach((comment) => {
    fragment.append(li.cloneNode(true));
    img.setAttribute('src', comment.avatar);
    img.setAttribute('alt', comment.name);
    textComment.textContent = comment.message;
  });
  socialComments.append(fragment);
  offset = offset + item.comments.slice(offset, offset + LIMIT_DISPLAYED_COMMENTS).length;
  controlShowAmountComments(item);
  buttonLoaderComments.classList.toggle('hidden', offset === item.comments.length);
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
const resetCacheLoadComments = (onButtonLoaderCommentsClick) => {
  offset = 0;
  buttonLoaderComments.removeEventListener('click', onButtonLoaderCommentsClick);
};
export const renderBigPhoto = (item) => {
  socialComments.innerHTML = '';
  renderContentPhoto(item);
  renderContentComments(item);
  const onButtonLoaderCommentsClick = () => {
    renderContentComments(item);
  };
  buttonLoaderComments.addEventListener('click', onButtonLoaderCommentsClick);
  buttonCloseBigPhoto.addEventListener('click', () => {
    resetCacheLoadComments(onButtonLoaderCommentsClick);
    closeBigPhoto();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      resetCacheLoadComments(onButtonLoaderCommentsClick);
    }
  });
};
