const closeBigPhoto = (photo) => {
  photo.classList.add('hidden');
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
  document.body.classList.remove('modal-open');
};
const openBigPhoto = (photo) => {
  photo.classList.remove('hidden');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');
};
export const setOpenBigPhoto = (photo) => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      openBigPhoto(photo);
    });
  });
};
export const setCloseBigPhoto = (photo) => {
  if (!photo.matches('hidden')) {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeBigPhoto(photo);
      }
    });
    photo.querySelector('#picture-cancel').addEventListener('click', () => {
      closeBigPhoto(photo);
    });
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
