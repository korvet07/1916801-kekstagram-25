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
export const sendData = (formData, onMessage, closeForm, unblockSubmitButton) => {
  fetch(' https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      if (response.ok) {
        onMessage('success');
      } else {
        onMessage('error');
      }
    })
    .catch(() => onMessage('error'))
    .finally(() => closeForm())
    .then(() => unblockSubmitButton());
};
