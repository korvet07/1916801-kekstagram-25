import { loadData } from './render-photos.js';
import { setOverlayForm, validateForm, setUserFormSubmit } from './form.js';
import { setScaleEffectsPhoto } from './set-effects-photo.js';
import { onError } from './message.js';
import { getData } from './api.js';
import { renderAlternative } from './filters.js';
getData((data) => {
  loadData(data);
  renderAlternative(data);
}, onError);
validateForm();
setOverlayForm();
setScaleEffectsPhoto();
setUserFormSubmit();
