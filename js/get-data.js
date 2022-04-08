export const getData = (renderPhotos, setOpenBigPhoto, setCloseBigPhoto, showAlert) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      renderPhotos(data);
      setOpenBigPhoto();
      setCloseBigPhoto();
    })
    .catch(() => showAlert('Ошибка загрузки фото, перезагрузите страницу!'));
};
