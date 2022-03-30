const photo = document.querySelector('.big-picture');
const socialComments = photo.querySelector('.social__comments');
const buttonLoaderComments = document.querySelector('.comments-loader');
const buttonCloseBigPhoto = photo.querySelector('#picture-cancel');
const amountShownComments = document.getElementsByClassName('social__comment');
const socialCommentsCount = document.querySelector('.social__comment-count');
let viewedComments = [];
// значение n - недостающее количество узлов DOM(LI) для отображения 5 комментариев при открытии bigPhoto
const getNewSocialComments = (n) => {
  for (let i = 1; i <= n; i++) {
    socialComments.append(photo.querySelector('.social__comment').cloneNode(true));
  }
  return socialComments;
};
getNewSocialComments(3);
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
export const renderBigPhoto = (item) => {

  const dataComments = item.comments.slice();
  const amountComments = item.comments.length;
  const renderComments = () => {
    document.querySelector('.big-picture__img>img').setAttribute('src', item.url);
    document.querySelector('.likes-count').textContent = item.likes;
    document.querySelector('.social__caption').textContent = item.description;
    socialCommentsCount.innerHTML = `${amountShownComments.length} из <span class="comments-count">${amountComments}</span> комментариев`;
  };
  //   количество показываемых комментариев для цикла - l-1, m - переменная для коррекции записи данных в новые комментарии, с учётом уже записанных
  const renderTextComments = function(l, m) {
    const imgAvatars = document.querySelectorAll('.social__comment>img');
    const textComments = document.querySelectorAll('.social__text');
    for (let i = 0; i <= l; i++) {
      imgAvatars[i + m].setAttribute('src', item.comments[i].avatar);
      imgAvatars[i + m].setAttribute('alt', item.comments[i].name);
      textComments[i + m].textContent = item.comments[i].message;
    }
  };
  renderComments();
  renderTextComments(4, 0);
  const templateComments = socialComments.innerHTML;
  const onButtonLoadCommentsClick = () => {
    viewedComments = viewedComments.concat(item.comments.splice(0, 5));
    if (item.comments.length < 5) {
      getNewSocialComments(item.comments.length);
      renderTextComments(item.comments.length - 1, viewedComments.length);
      buttonLoaderComments.classList.add('hidden');
    } else {
      getNewSocialComments(5);
      renderTextComments(4, viewedComments.length);
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
