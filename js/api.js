import { onRenderRandomPhotos, onRenderDefaultPhotos, onRenderDiscussedPhotos, debounce } from './filters.js';
const RERENDER_DELAY = 500;
export const getData = (onSuccess, onError) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      const allPhotos = data.slice();
      onSuccess(allPhotos);
      onRenderDefaultPhotos(debounce(() => {
        document.querySelectorAll('.picture').forEach((picture) => { picture.remove(); });
        onSuccess(allPhotos);
      }, RERENDER_DELAY));
      return data;
    })
    .then((data) => {
      onRenderDiscussedPhotos(debounce(() => {
        document.querySelectorAll('.picture').forEach((picture) => { picture.remove(); });
        const discussedPhotos = data.slice().sort((a, b) => {
          if (a.likes === b.likes) {
            return 0;
          }
          return a.likes < b.likes ? 1 : -1;
        });
        onSuccess(discussedPhotos);
      }, RERENDER_DELAY));
      return data;
    })
    .then((photos) => onRenderRandomPhotos(debounce(() => {
      window.console.log(photos);
      document.querySelectorAll('.picture').forEach((picture) => { picture.remove(); });
      const randomPhotos = photos.slice().sort(() => Math.random() - 0.5).slice(0, 10);
      window.console.log(randomPhotos);
      onSuccess(randomPhotos);
    }, RERENDER_DELAY)))
    .catch(() => onError('Ошибка загрузки фото, перезагрузите страницу!'));
};
export const sendData = (body, onSendStatus, onFinally, onMoreAction, onSomeMoreAction) => {
  fetch(' https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: body,
    })
    .then((response) => {
      if (response.ok) {
        onSendStatus('success');
      } else {
        onSendStatus('error');
      }
    })
    .catch(() => onSendStatus('error'))
    .finally(() => onFinally())
    .then(() => onMoreAction())
    .then(() => onSomeMoreAction());
};
