const photo = document.querySelector('.big-picture');
const closeBigPhoto = () => {
  photo.classList.add('hidden');
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
  document.body.classList.remove('modal-open');
};
const openBigPhoto = () => {
  photo.classList.remove('hidden');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
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
    photo.querySelector('#picture-cancel').addEventListener('click', onBigPhotoClick);
  } else {
    document.removeEventListener('keydown', onBigPhotoEscKey);
    photo.querySelector('#picture-cancel').removeEventListener('click', onBigPhotoClick);
  }
};
export const renderBigPhoto = (item) => {
  document.querySelector('.big-picture__img>img').setAttribute('src', item.url);
  document.querySelector('.likes-count').textContent = item.likes;
  document.querySelector('.comments-count').textContent = item.comments.length;
  document.querySelector('.social__caption').textContent = item.description;
  document.querySelectorAll('.social__comment>img')[0].setAttribute('src', item.comments[0].avatar);
  document.querySelectorAll('.social__comment>img')[1].setAttribute('src', item.comments[1].avatar);
  document.querySelectorAll('.social__comment>img')[0].setAttribute('alt', item.comments[0].name);
  document.querySelectorAll('.social__comment>img')[1].setAttribute('alt', item.comments[1].name);
  document.querySelectorAll('.social__text')[0].textContent = item.comments[0].message;
  document.querySelectorAll('.social__text')[1].textContent = item.comments[1].message;
};
