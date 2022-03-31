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
const templateComments = socialComments.innerHTML;
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
const controlShowAmountComments = (amountComments) => {
  socialCommentsCount.innerHTML = `${amountShownComments.length} из <span class="comments-count">${amountComments}</span> комментариев`;
};
export const renderBigPhoto = (item) => {
  renderComments(item);
  const amountComments = item.comments.length;
  const dataComments = item.comments.slice();
  window.console.log(item, item.comments.length, amountShownComments.length);
  if (item.comments.length < LIMIT_DISPLAYED_COMMENTS) {
    for (let i = 0; i < LIMIT_DISPLAYED_COMMENTS - item.comments.length; i++) {
      socialComments.removeChild(amountShownComments[i]);
    }
    buttonLoaderComments.classList.add('hidden');
    renderTextComments(item.comments.length - 1, 0, item);
    controlShowAmountComments(amountComments);
    window.console.log(item, item.comments.length, amountShownComments);
    const revertInitialDisplayedElementDom = () => {
      socialComments.innerHTML = '';
      socialComments.insertAdjacentHTML('beforeend', templateComments);
    };
    buttonCloseBigPhoto.addEventListener('click', () => revertInitialDisplayedElementDom());
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        revertInitialDisplayedElementDom();
      }
    });
  } else {
    controlShowAmountComments(amountComments);
    renderTextComments(CORRECTED_DISPLAYED_COMMENTS, 0, item);
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
      controlShowAmountComments(amountComments);
      window.console.log(item, item.comments.length, amountShownComments);
    };
    buttonLoaderComments.addEventListener('click', onButtonLoadCommentsClick);
    const revertInitialDataComments = () => {
      socialComments.innerHTML = '';
      socialComments.insertAdjacentHTML('beforeend', templateComments);
      item.comments.length = 0;
      item.comments = dataComments.slice();
      buttonLoaderComments.classList.remove('hidden');
      buttonLoaderComments.removeEventListener('click', onButtonLoadCommentsClick);
      viewedComments.length = 0;
    };
    buttonCloseBigPhoto.addEventListener('click', () => revertInitialDataComments());
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        revertInitialDataComments();
      }
    });
  }
};
