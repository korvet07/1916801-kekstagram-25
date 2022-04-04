const inputScaleSizePhoto = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview>img');
const buttonBiggerSize = document.querySelector('.scale__control--bigger');
const buttonSmallerSize = document.querySelector('.scale__control--smaller');
const inputEffectChrome = document.querySelector('#effect-chrome');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const inputEffectNone = document.querySelector('#effect-none');
const inputEffectSepia = document.querySelector('#effect-sepia');
const inputEffectPhobos = document.querySelector('#effect-phobos');
const inputEffectHeat = document.querySelector('#effect-heat');
const inputEffectMarvin = document.querySelector('#effect-marvin');
export const setScaleSizePhoto = () => {
  inputScaleSizePhoto.value = '100%';
  let valueSize = parseInt(inputScaleSizePhoto.value.match(/\d+/), 10);
  const setShowScale = () => {
    inputScaleSizePhoto.value = `${valueSize}%`;
    imgUploadPreview.style.transform = `scale(${valueSize * 0.01})`;
  };
  const onButtonSmallerSizeClick = () => {
    if (valueSize === 25) {
      setShowScale();
    } else {
      valueSize = valueSize - 25;
      setShowScale();
      return valueSize;
    }
  };
  buttonSmallerSize.addEventListener('click', onButtonSmallerSizeClick);
  const onButtonBiggerSizeClick = () => {
    if (valueSize === 100) {
      setShowScale();
    } else {
      valueSize = valueSize + 25;
      setShowScale();
    }
  };
  buttonBiggerSize.addEventListener('click', () => {
    onButtonBiggerSizeClick();
  });
};
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});
sliderElement.noUiSlider.on('update', () => {
  valueElement.setAttribute('value', sliderElement.noUiSlider.get());
});
document.querySelectorAll('.effects__radio').forEach((element) => {
  element.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      imgUploadPreview.className = `effects__preview--${element.value}`;
    }
  });
});
const updateOptionsForPhobosHeat = () => sliderElement.noUiSlider.updateOptions({
  range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
});
const updateOptionsForChromeSepia = () => sliderElement.noUiSlider.updateOptions({
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1
});
export const setScaleEffectsPhoto = () => {
  inputEffectNone.addEventListener('focus', () => {
    imgUploadPreview.setAttribute('style', `transform: scale(${inputScaleSizePhoto.value})`);
    sliderElement.setAttribute('disabled', true);
  });
  inputEffectNone.addEventListener('blur', () => {
    sliderElement.removeAttribute('disabled');
  });
  inputEffectChrome.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      updateOptionsForChromeSepia();
      sliderElement.noUiSlider.on('update', () => {
        imgUploadPreview.setAttribute('style', `filter: grayscale(${valueElement.value}); transform: scale(${inputScaleSizePhoto.value})`);
        valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      });
    }
  });
  inputEffectSepia.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      updateOptionsForChromeSepia();
      sliderElement.noUiSlider.on('update', () => {
        imgUploadPreview.setAttribute('style', `filter: sepia(${valueElement.value}); transform: scale(${inputScaleSizePhoto.value})`);
        valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      });
    }
  });
  inputEffectMarvin.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      sliderElement.noUiSlider.on('update', () => {
        imgUploadPreview.setAttribute('style', `filter: invert(${valueElement.value}%); transform: scale(${inputScaleSizePhoto.value})`);
        valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      });
    }
  });
  inputEffectPhobos.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      updateOptionsForPhobosHeat();
      sliderElement.noUiSlider.on('update', () => {
        imgUploadPreview.setAttribute('style', `filter: blur(${valueElement.value}px); transform: scale(${inputScaleSizePhoto.value})`);
        valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      });
    }
  });
  inputEffectHeat.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      updateOptionsForPhobosHeat();
      sliderElement.noUiSlider.on('update', () => {
        imgUploadPreview.setAttribute('style', `filter: brightness(${valueElement.value}); transform: scale(${inputScaleSizePhoto.value})`);
        valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      });
    }
  });
};
