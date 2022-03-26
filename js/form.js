import { onCloseFormEscKey } from './validate-form.js';
const controllerForm = document.querySelector('#upload-file');
const overlayForm = document.querySelector('.img-upload__overlay');
const closeFormButton = document.querySelector('.img-upload__cancel');
const onControllerFormChange = () => {
  overlayForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
};
export const closeForm = () => {
  overlayForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
};
const onCloseFormButtonClick = () => {
  closeForm();
};
const addListenerCloseButton = () => {
  closeFormButton.addEventListener('click', onCloseFormButtonClick);
};
const removeListenerCloseButton = () => {
  closeFormButton.removeEventListener('click', onCloseFormButtonClick);
};

export const setOverlayForm = () => {
  controllerForm.addEventListener('change', onControllerFormChange);
  if (!overlayForm.matches('hidden')) {
    addListenerCloseButton();
    document.addEventListener('keydown', onCloseFormEscKey);

  } else {
    document.removeEventListener('keydown', onCloseFormEscKey);
    removeListenerCloseButton();
  }
};
