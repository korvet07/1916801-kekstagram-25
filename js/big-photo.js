const photo = document.querySelector('.big-picture');
const socialComments = photo.querySelector('.social__comments');
const buttonLoaderComments = document.querySelector('.comments-loader');
const buttonCloseBigPhoto = photo.querySelector('#picture-cancel');
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


  document.querySelector('.big-picture__img>img').setAttribute('src', item.url);
  document.querySelector('.likes-count').textContent = item.likes;
  document.querySelector('.comments-count').textContent = item.comments.length;
  document.querySelector('.social__caption').textContent = item.description;
  const renderComments = (n) => {
    for (let i = 0; i <= n; i++) {
      document.querySelectorAll('.social__comment>img')[i].setAttribute('src', item.comments[i].avatar);
      document.querySelectorAll('.social__comment>img')[i].setAttribute('alt', item.comments[i].name);
      document.querySelectorAll('.social__text')[i].textContent = item.comments[i].message;
    }
  };
  renderComments(4);


  if(item.comments.length < 5){
    buttonLoaderComments.classList.remove('hidden');
    getNewSocialComments(item.comments.length);
    renderComments(item.comments.length);
  }
  renderComments(4);
  window.console.log(item.comments, document.querySelectorAll('.social__comment>img'));
  const onButtonLoadCommentsClick =  ()  => {
    item.comments.splice(0, 5);


    if (item.comments.length === 0) {
      buttonLoaderComments.classList.add('hidden');

    }
    window.console.log(item.comments, document.querySelectorAll('.social__comment>img'));
    getNewSocialComments(5);
    renderComments(4);

  };
  buttonLoaderComments.addEventListener('click', onButtonLoadCommentsClick);
  buttonCloseBigPhoto.addEventListener('click', () => {


    window.console.log(item.comments);
    // renderSocialComments();
  });
};
