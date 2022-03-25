import { resetValueInputs } from './validate-form.js';
const controllerForm = document.querySelector('#upload-file');
const overlayForm = document.querySelector('.img-upload__overlay');
const closeFormButton = document.querySelector('.img-upload__cancel');
const onControllerFormChange = () => {
  overlayForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
};
const closeForm = () => {
  overlayForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
};
controllerForm.addEventListener('change', onControllerFormChange);
const onCloseFormButtonClick = () => {
  closeForm();
};
export const addListenerCloseButton = () => {
  closeFormButton.addEventListener('click', onCloseFormButtonClick);
};
export const removeListenerCloseButton = () => {
  closeFormButton.removeEventListener('click', onCloseFormButtonClick);
};
export const onCloseFormEscKey = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
    resetValueInputs();
  }
};
export const setOverlayForm = () => {
  if (!overlayForm.matches('hidden')) {
    document.addEventListener('keydown', onCloseFormEscKey);
    addListenerCloseButton();
  } else {
    document.removeEventListener('keydown', onCloseFormEscKey);
    removeListenerCloseButton();
  }
};
