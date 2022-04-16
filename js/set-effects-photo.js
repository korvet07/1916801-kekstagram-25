const MAX_SIZE_DEFAULT = 100;
const STEP_END_MIN_SIZE = 25;
const COEFFICIENT_CORRECT_STYLE_VALUE = 0.01;
const MIN_VALUE_HEAT = 1;
const MAX_VALUE_FOR_PHOBOS_HEAT = 3;
const START_VALUE_FOR_PHOBOS_HEAT = 3;
const STEP_VALUE_FOR_PHOBOS_HEAT = 0.1;
const MAX_VALUE_FOR_CHROME_SEPIA = 1;
const STEP_VALUE_FOR_CHROME_SEPIA = 0.1;
const START_VALUE_FOR_CHROME_SEPIA = 1;
const MAX_VALUE_FOR_SET_SCALE = 1;
const STEP_VALUE_FOR_SET_SCALE = 0.1;
const START_VALUE_FOR_SET_SCALE = 1;
const MAX_VALUE_FOR_MARVIN = 100;
const STEP_VALUE_FOR_MARVIN = 1;
const START_VALUE_FOR_MARVIN = 100;
const RADIX_PARAMETER_FOR_DECIMAL_NUMBER_SYSTEM = 10;
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
  let valueSize = parseInt(inputScaleSizePhoto.value.match(/\d+/), RADIX_PARAMETER_FOR_DECIMAL_NUMBER_SYSTEM);
  const setShowScale = () => {
    inputScaleSizePhoto.value = `${valueSize}%`;
    imgUploadPreview.style.transform = `scale(${valueSize * COEFFICIENT_CORRECT_STYLE_VALUE})`;
  };
  const onButtonSmallerSizeClick = () => {
    if (valueSize !== STEP_END_MIN_SIZE) {
      valueSize = valueSize - STEP_END_MIN_SIZE;
    }
    setShowScale();
    return valueSize;
  };
  buttonSmallerSize.addEventListener('click', onButtonSmallerSizeClick);
  const onButtonBiggerSizeClick = () => {
    if (valueSize === MAX_SIZE_DEFAULT) {
      setShowScale();
    } else {
      valueSize = valueSize + STEP_END_MIN_SIZE;
      setShowScale();
    }
  };
  buttonBiggerSize.addEventListener('click', () => {
    onButtonBiggerSizeClick();
  });
};
const updateOptionsForPhobosHeat = (evt, filter, unit = '', min = MIN_VALUE_HEAT) => {
  if (evt.target.checked) {
    sliderElement.removeAttribute('disabled');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: min,
        max: MAX_VALUE_FOR_PHOBOS_HEAT,
      },
      start: START_VALUE_FOR_PHOBOS_HEAT,
      step: STEP_VALUE_FOR_PHOBOS_HEAT,
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
      max: MAX_VALUE_FOR_CHROME_SEPIA,
    },
    start: START_VALUE_FOR_CHROME_SEPIA,
    step: STEP_VALUE_FOR_CHROME_SEPIA,
  });
};
export const setScaleEffectsPhoto = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: MAX_VALUE_FOR_SET_SCALE,
    },
    start: START_VALUE_FOR_SET_SCALE,
    step: STEP_VALUE_FOR_SET_SCALE,
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
      sliderElement.noUiSlider.set(MAX_SIZE_DEFAULT);
      imgUploadPreview.setAttribute('style', `transform: scale(${inputScaleSizePhoto.value})`);
      sliderElement.setAttribute('disabled', 'disabled');
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
          max: MAX_VALUE_FOR_MARVIN,
        },
        start: START_VALUE_FOR_MARVIN,
        step: STEP_VALUE_FOR_MARVIN,
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
