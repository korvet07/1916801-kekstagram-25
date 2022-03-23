import { formAddedPhoto, onCloseFormEscKey } from './form.js';
import { checkLengthString } from './util.js';
const pristine = new Pristine(formAddedPhoto);
const hashtagsInput = formAddedPhoto.querySelector('.text__hashtags');
const commetnsInput = formAddedPhoto.querySelector('.text__description');
const checkSimbvolHashtags = (hashtag) => {
  const regularExpression = /^[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
  return regularExpression.test(hashtag);
};
const changeArrayElement = () => {
  const hashtags = hashtagsInput.value.split(' #');
  const hash = hashtags[0].substr(1);
  hashtags[0] = hash;
  return hashtags;
};
const checkComparisonHashtags = () => {
  const hashtags =changeArrayElement();
  const newHashtags = hashtags.map((hashtag)=> hashtag.toUpperCase());
  const compare = new Set(newHashtags);
  if(newHashtags.length > compare.size){
    return false;
  }else{
    return true;
  }
};
const checkHashtags = () => {
  const hashtags = changeArrayElement();
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

pristine.addValidator(hashtagsInput, finaleCheckHashtags);
formAddedPhoto.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
pristine.addValidator(commetnsInput, checkLengthString);
formAddedPhoto.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
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
