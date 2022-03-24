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
const onCloseFormButtonClick = () => {
  closeForm();
};
controllerForm.addEventListener('change', onControllerFormChange);
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
    closeFormButton.addEventListener('click', onCloseFormButtonClick );

  } else {
    document.removeEventListener('keydown', onCloseFormEscKey);
    closeFormButton.removeEventListener('click', onCloseFormButtonClick);
  }
};
