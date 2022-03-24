import { formAddedPhoto, onCloseFormEscKey } from './form.js';
// import { checkLengthString } from './util.js';
const pristine = new Pristine(formAddedPhoto,{
  classTo: 'form-upload__label-hashtags',
  errorTextParent: 'form-upload__label-hashtags',
  errorTextClass: 'img-upload__text-error',
});
const hashtagsInput = formAddedPhoto.querySelector('.text__hashtags');
const commetnsInput = formAddedPhoto.querySelector('.text__description');
const checkSimbvolHashtags = (hashtag) => {
  const regularExpression = /^(#[A-Za-zА-Яа-яЁё0-9]{1,19}[\s+]*)*$/;
  return regularExpression.test(hashtag);
};
const checkComparisonHashtags = () => {
  const hashtags =hashtagsInput.value.split(' ');
  const newHashtags = hashtags.map((hashtag)=> hashtag.toUpperCase());
  const compare = new Set(newHashtags);
  if(newHashtags.length > compare.size){
    return false;
  }else{
    return true;
  }
};
const checkHashtags = () => {
  const hashtags = hashtagsInput.value.split(' ');
  if (hashtags.length <= 5) {
    for (const hashtag of hashtags) {
      if (!checkSimbvolHashtags(hashtag)) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
};
const finaleCheckHashtags = () => {
  if (checkHashtags()) {
    return checkComparisonHashtags();
  } else {
    return false;
  }
};
hashtagsInput.addEventListener('change', () => {
  finaleCheckHashtags();
});
const removeListenerEscKey = () => {
  document.removeEventListener('keydown', onCloseFormEscKey);
};
const addedListenerEscKey = () => {
  document.addEventListener('keydown', onCloseFormEscKey);
};
// pristine.addValidator(hashtagsInput, finaleCheckHashtags);
formAddedPhoto.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
// pristine.addValidator(commetnsInput, checkLengthString);
// formAddedPhoto.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   pristine.validate();
// });
export const stopPropagation = () => {
  hashtagsInput.addEventListener('focus', () => {
    removeListenerEscKey();
  });
  commetnsInput.addEventListener('focus', () => {
    removeListenerEscKey();
  });
  commetnsInput.addEventListener('blur', () => {
    addedListenerEscKey();
  });
  hashtagsInput.addEventListener('blur', () => {
    addedListenerEscKey();
  });
};
