import { onSendStatus } from './message.js';
import { sendData } from './api.js';
import { setScaleSizePhoto } from './set-effects-photo.js';
const MAX_AMOUNT_HASHTAGS = 20;
const MAX_LENGTH_HASHTAG = 5;
const MAX_VALUE_SIZE = 100;
const MAX_LENGTH_COMMENT = 140;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const sliderElement = document.querySelector('.effect-level__slider');
const imgUploadPreview = document.querySelector('.img-upload__preview>img');
const controllerForm = document.querySelector('#upload-file');
const overlayForm = document.querySelector('.img-upload__overlay');
const closeFormButton = document.querySelector('.img-upload__cancel');
const formAddedPhoto = document.querySelector('#upload-select-image');
const hashtagsInput = formAddedPhoto.querySelector('.text__hashtags');
const commentsInput = formAddedPhoto.querySelector('.text__description');
const submitButton = formAddedPhoto.querySelector('.img-upload__submit');
const pristine = new Pristine(formAddedPhoto, {
  classTo: 'form-upload__error',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'form-upload__error',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__text',
});
const resetValueInputs = () => {
  hashtagsInput.value = '';
  commentsInput.value = '';
  pristine.validate();
  sliderElement.noUiSlider.set(MAX_VALUE_SIZE);
  document.querySelector('.scale__control--value').value = '100%';
  imgUploadPreview.setAttribute('style', 'transform: scale(100%)');
  sliderElement.setAttribute('disabled', 'disabled');
  imgUploadPreview.className = 'effects__preview--none';
  document.querySelector('#effect-none').checked = true;
  setScaleSizePhoto();
};
const onControllerFormChange = () => {
  overlayForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetValueInputs();
  const file = controllerForm.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
};
const closeForm = () => {
  overlayForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  controllerForm.value = '';
};
const onCloseFormButtonClick = () => {
  closeForm();
};
const onCloseFormEscKey = (evt) => {
  if (evt.key === 'Escape' && evt.target !== hashtagsInput && evt.target !== commentsInput) {
    evt.preventDefault();
    closeForm();
  }
};
const addListenerCloseButton = () => {
  closeFormButton.addEventListener('click', onCloseFormButtonClick);
};
const removeListenerCloseButton = () => {
  closeFormButton.removeEventListener('click', onCloseFormButtonClick);
};
const checkLengthString = () => commentsInput.value.length <= MAX_LENGTH_COMMENT;
const checkLengthHashtag = () => {
  const hashtags = hashtagsInput.value.split(' ');
  const newHashtags = hashtags.map((hashtag) => hashtag.length);
  for (const newHashtag of newHashtags) {
    if (+newHashtag > MAX_AMOUNT_HASHTAGS) {
      return false;
    }
  }
  return true;
};
const checkSymbolHashtags = () => {
  const hashtags = hashtagsInput.value.split(' ');
  const regularExpression = /^(#[A-Za-zА-Яа-яЁё0-9]{1,}[\s+]*)*$/;
  const newHashtags = hashtags.map((hashtag) => regularExpression.test(hashtag));
  return !newHashtags.includes(false);
};
const checkComparisonHashtags = () => {
  const hashtags = hashtagsInput.value.split(' ');
  const newHashtags = hashtags.map((hashtag) => hashtag.toUpperCase());
  const compare = new Set(newHashtags);
  return !(newHashtags.length > compare.size);
};
const checkAmountHashtag = () => {
  const hashtags = hashtagsInput.value.split(' ');
  return hashtags.length <= MAX_LENGTH_HASHTAG;
};
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};
export const validateForm = () => {
  pristine.addValidator(hashtagsInput, checkLengthHashtag, 'Hе более 20 символов в 1 хештеге!');
  pristine.addValidator(hashtagsInput, checkSymbolHashtags, 'Хештеги должны начинаться с # или недопустимые символы в хештеге');
  pristine.addValidator(hashtagsInput, checkComparisonHashtags, 'Одинаковые хештеги не допустимы!');
  pristine.addValidator(hashtagsInput, checkAmountHashtag, 'Не более 5 хештегов!');
  pristine.addValidator(commentsInput, checkLengthString, 'Не более 140 символов');
};
export const setUserFormSubmit = () => {
  formAddedPhoto.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        new FormData(evt.target),
        (type) => onSendStatus(type),
        () => closeForm(),
        () => unblockSubmitButton(),
        () => resetValueInputs(),
      );
    }
  });
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
