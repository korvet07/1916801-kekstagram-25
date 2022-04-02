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
const renderComments = (item) => {
  window.console.log(item.comments.length);
  const dataComments = item.comments;
  const fragment = new DocumentFragment();
  dataComments.slice(offset, offset + LIMIT_DISPLAYED_COMMENTS).forEach((dataComment) => {
    fragment.append(li.cloneNode(true));
    img.setAttribute('src', dataComment.avatar);
    img.setAttribute('alt', dataComment.name);
    textComment.textContent = dataComment.message;
  });
  socialComments.append(fragment);
  offset = offset + item.comments.slice(offset, offset + LIMIT_DISPLAYED_COMMENTS).length;
  controlShowAmountComments(item);
  buttonLoaderComments.classList.toggle('hidden', (item.comments.slice(offset, offset + LIMIT_DISPLAYED_COMMENTS).length < LIMIT_DISPLAYED_COMMENTS) && offset === item.comments.length || (item.comments.slice(offset, offset + LIMIT_DISPLAYED_COMMENTS).length === LIMIT_DISPLAYED_COMMENTS && offset === item.comments.length));
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
export const renderBigPhoto = (item) => {
  socialComments.innerHTML = '';
  renderContentPhoto(item);
  renderComments(item);
  const onButtonLoaderCommentsClick = () => {
    renderComments(item);
  };
  buttonLoaderComments.addEventListener('click', onButtonLoaderCommentsClick);
  buttonCloseBigPhoto.addEventListener('click', () => {
    offset = 0;
    buttonLoaderComments.removeEventListener('click', onButtonLoaderCommentsClick);
    closeBigPhoto();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      offset = 0;
      buttonLoaderComments.removeEventListener('click', onButtonLoaderCommentsClick);
    }
  });
};
