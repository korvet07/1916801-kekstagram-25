const ALERT_SHOW_TIME = 5000;
export const onSendStatus = (type) => {
  const templateSuccess = document.querySelector(`#${type}`).content.cloneNode(true);
  document.body.append(templateSuccess);
  const popup = document.querySelector(`.${type}__inner`);
  const closeButtonSuccess = document.querySelector(`.${type}__button`);
  closeButtonSuccess.addEventListener('click', () => {
    document.querySelector(`.${type}`).remove();
  }, { once: true });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && document.querySelector(`.${type}`)) {
      evt.preventDefault();
      document.querySelector(`.${type}`).remove();
    }
  }, { once: true });
  document.addEventListener('click', (evt) => {
    const withinBoundaries = evt.composedPath().includes(popup);
    if (!withinBoundaries && document.querySelector(`.${type}`)) {
      document.querySelector(`.${type}`).remove();
    }
  }, { once: true });
};
export const onError = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '20px 5px';
  alertContainer.style.fontSize = '40px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'black';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
