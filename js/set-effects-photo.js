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
  const stepEndMinSize = 25;
  const maxSize = 100;
  const coefficientCorrectStyleValue = 0.01;
  inputScaleSizePhoto.value = '100%';
  let valueSize = parseInt(inputScaleSizePhoto.value.match(/\d+/), 10);
  const setShowScale = () => {
    inputScaleSizePhoto.value = `${valueSize}%`;
    imgUploadPreview.style.transform = `scale(${valueSize * coefficientCorrectStyleValue
    })`;
  };
  const onButtonSmallerSizeClick = () => {
    if (valueSize === stepEndMinSize) {
      setShowScale();
    } else {
      valueSize = valueSize - stepEndMinSize;
      setShowScale();
      return valueSize;
    }
  };
  buttonSmallerSize.addEventListener('click', onButtonSmallerSizeClick);
  const onButtonBiggerSizeClick = () => {
    if (valueSize === maxSize) {
      setShowScale();
    } else {
      valueSize = valueSize + stepEndMinSize;
      setShowScale();
    }
  };
  buttonBiggerSize.addEventListener('click', () => {
    onButtonBiggerSizeClick();
  });
};
const updateOptionsForPhobosHeat = (evt, filter, unit = '', min = 1) => {
  if (evt.target.checked) {
    sliderElement.removeAttribute('disabled');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: min,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
  sliderElement.noUiSlider.on('update', () => {
    imgUploadPreview.setAttribute('style', `filter: ${filter}(${valueElement.value}${unit}); transform: scale(${inputScaleSizePhoto.value})`);
    valueElement.setAttribute('value', sliderElement.noUiSlider.get());
  });
};
const updateOptionsForChromeSepia = () => {
  sliderElement.removeAttribute('disabled');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1
  });
};
export const setScaleEffectsPhoto = () => {
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
  const setScaleEffectNone = () => {
    if (inputEffectNone.checked) {
      imgUploadPreview.setAttribute('style', `transform: scale(${inputScaleSizePhoto.value})`);
    }
  };
  setScaleEffectNone();
  inputEffectNone.addEventListener('change', () => {
    setScaleEffectNone();
  });
  const setScaleEffectChrome = (evt) => {
    if (evt.target.checked) {
      updateOptionsForChromeSepia();
      sliderElement.noUiSlider.on('update', () => {
        imgUploadPreview.setAttribute('style', `filter: grayscale(${valueElement.value}); transform: scale(${inputScaleSizePhoto.value})`);
        valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      });
    }
  };
  inputEffectChrome.addEventListener('change', (evt) => {
    setScaleEffectChrome(evt);
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
      sliderElement.removeAttribute('disabled');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      sliderElement.noUiSlider.on('update', () => {
        imgUploadPreview.setAttribute('style', `filter: invert(${Math.trunc(valueElement.value)}%); transform: scale(${inputScaleSizePhoto.value})`);
        valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      });
    }
  });

  inputEffectPhobos.addEventListener('change', (evt) => {
    updateOptionsForPhobosHeat(evt, 'blur', 'px', 0);
  });
  inputEffectHeat.addEventListener('change', (evt) => {
    updateOptionsForPhobosHeat(evt, 'brightness');
  });
};
