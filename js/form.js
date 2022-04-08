import { onMessage } from './message.js';
import { sendData } from './api.js';
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
  document.getElementsByClassName('effect-level__value')[0].setAttribute('value', '1');
  document.querySelector('.img-upload__preview>img').setAttribute('style', 'transform: scale(100%)');
  document.querySelector('.effect-level__slider').setAttribute('disabled', true);
  document.querySelector('.img-upload__preview>img').className = 'effects__preview--none';
};
const onControllerFormChange = () => {
  overlayForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetValueInputs();
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
  else {
    document.body.classList.add('modal-open');
  }
};
const addListenerCloseButton = () => {
  closeFormButton.addEventListener('click', onCloseFormButtonClick);
};
const removeListenerCloseButton = () => {
  closeFormButton.removeEventListener('click', onCloseFormButtonClick);
};
const checkLengthString = () => commentsInput.value.length <= 140;
const checkLengthHashtag = () => {
  const hashtags = hashtagsInput.value.split(' ');
  const newHashtags = hashtags.map((hashtag) => hashtag.length);
  for (const newHashtag of newHashtags) {
    if (+newHashtag > 20) {
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
  return hashtags.length <= 5;
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
      const formData = new FormData(evt.target);
      sendData(formData, onMessage, closeForm, unblockSubmitButton);
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
