import { onDataLoaded } from './render-photos.js';
import { setOverlayForm, validateForm, setUserFormSubmit } from './form.js';
import { setScaleSizePhoto, setScaleEffectsPhoto } from './set-effects-photo.js';
import { onError } from './message.js';
import { getData } from './api.js';
import { onAlternativeRenders } from './filters.js';
getData(onDataLoaded, onError, onAlternativeRenders);
validateForm();
setOverlayForm();
setScaleSizePhoto();
setScaleEffectsPhoto();
setUserFormSubmit();
