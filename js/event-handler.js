export const openBigPhoto = (photo) => {
  photo.classList.remove('hidden');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');
};
export const сloseBigPhoto = (photo) => {
  if (!photo.matches('hidden')) {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        photo.classList.add('hidden');
        document.querySelector('.social__comment-count').classList.remove('hidden');
        document.querySelector('.comments-loader').classList.remove('hidden');
        document.body.classList.remove('modal-open');
      }
    });
    photo.querySelector('#picture-cancel').addEventListener('click', () => {
      photo.classList.add('hidden');
      document.querySelector('.social__comment-count').classList.remove('hidden');
      document.querySelector('.comments-loader').classList.remove('hidden');
      document.body.classList.remove('modal-open');
    });
  }
};
