export const getData = (onSuccess, onError, onMoreSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      onMoreSuccess(data);
      onSuccess(data);
    })
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
