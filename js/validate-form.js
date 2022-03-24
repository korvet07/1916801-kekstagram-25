import { onCloseFormEscKey } from './form.js';
const formAddedPhoto = document.querySelector('#upload-select-image');
const hashtagsInput = formAddedPhoto.querySelector('.text__hashtags');
const commentsInput = formAddedPhoto.querySelector('.text__description');
const pristine = new Pristine(formAddedPhoto, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text-error',
});
const checkLengthString = () => commentsInput.value.length <= 140;
const checkSymbvolHashtags = (hashtag) => {
  const regularExpression = /^(#[A-Za-zА-Яа-яЁё0-9]{1,19}[\s+]*)*$/;
  return regularExpression.test(hashtag);
};
const checkComparisonHashtags = () => {
  const hashtags = hashtagsInput.value.split(' ');
  const newHashtags = hashtags.map((hashtag) => hashtag.toUpperCase());
  const compare = new Set(newHashtags);
  return !(newHashtags.length > compare.size);

};
const checkHashtags = () => {
  const hashtags = hashtagsInput.value.split(' ');
  if (hashtags.length <= 5) {
    const newHashtags = hashtags.map((hashtag) => checkSymbvolHashtags(hashtag));
    return !newHashtags.includes(false);
  }
  return false;
};
const stopCheckHashtags = () => {
  if (checkHashtags()) {
    return checkComparisonHashtags();
  }
  return false;
};
hashtagsInput.addEventListener('change', () => {
  stopCheckHashtags();
  window.console.log(stopCheckHashtags());
});
commentsInput.addEventListener('change', () => {
  checkLengthString();
});
const removeListenerEscKey = () => {
  document.removeEventListener('keydown', onCloseFormEscKey);
};
const addedListenerEscKey = () => {
  document.addEventListener('keydown', onCloseFormEscKey);
};
pristine.addValidator(hashtagsInput, stopCheckHashtags);
pristine.addValidator(commentsInput, checkLengthString, 'Не более 140 символов');
formAddedPhoto.addEventListener('submit', (event) => {
  const isValid = pristine.validate();
  if (!isValid) {
    event.preventDefault();
  }
});
export const resetValueInputs = () => {
  formAddedPhoto.reset();
};
export const cancelListenerEscKey = () => {
  hashtagsInput.addEventListener('focus', () => {
    removeListenerEscKey();
  });
  commentsInput.addEventListener('focus', () => {
    removeListenerEscKey();
  });
  commentsInput.addEventListener('blur', () => {
    addedListenerEscKey();
  });
  hashtagsInput.addEventListener('blur', () => {
    addedListenerEscKey();
  });
};
