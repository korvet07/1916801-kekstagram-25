import { onCloseFormEscKey, removeListenerCloseButton, addListenerCloseButton } from './form.js';
const formAddedPhoto = document.querySelector('#upload-select-image');
const hashtagsInput = formAddedPhoto.querySelector('.text__hashtags');
const commentsInput = formAddedPhoto.querySelector('.text__description');
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
const removeListenerEscKey = () => {
  document.removeEventListener('keydown', onCloseFormEscKey);
};
const addedListenerEscKey = () => {
  document.addEventListener('keydown', onCloseFormEscKey);
};
export const validateForm = () => {
  const pristine = new Pristine(formAddedPhoto, {
    classTo: 'img-upload__text',
    errorClass: 'img-upload__text--invalid',
    successClass: 'img-upload__text--valid',
    errorTextParent: 'img-upload__text',
    errorTextTag: 'div',
    errorTextClass: 'form-upload__error',
  });
  pristine.addValidator(hashtagsInput, checkLengthHashtag, 'Hе более 20 символов в 1 хештеге!');
  pristine.addValidator(hashtagsInput, checkSymbolHashtags, 'Хештеги должны начинаться с # или недопустимые символы в хештеге');
  pristine.addValidator(hashtagsInput, checkComparisonHashtags, 'Одинаковые хештеги не допустимы!');
  pristine.addValidator(hashtagsInput, checkAmountHashtag, 'Не более 5 хештегов!');
  pristine.addValidator(commentsInput, checkLengthString, 'Не более 140 символов');
  formAddedPhoto.addEventListener('submit', (event) => {
    if (!pristine.validate()) {
      event.preventDefault();
    }
  });
};
export const resetValueInputs = () => {
  formAddedPhoto.reset();
};

export const stopClosedForm = () => {
  hashtagsInput.addEventListener('focus', () => {
    removeListenerEscKey();
  });
  commentsInput.addEventListener('focus', () => {
    removeListenerEscKey();
  });
  commentsInput.addEventListener('focus', () => {
    removeListenerCloseButton();
  });
  hashtagsInput.addEventListener('focus', () => {
    removeListenerCloseButton();
  });
  commentsInput.addEventListener('blur', () => {
    addedListenerEscKey();
  });
  commentsInput.addEventListener('blur', () => {
    addListenerCloseButton();
  });
  hashtagsInput.addEventListener('blur', () => {
    addedListenerEscKey();
  });
  hashtagsInput.addEventListener('blur', ()=>{
    addListenerCloseButton();
  });
};
