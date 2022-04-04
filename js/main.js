import { getMockPhotos } from './data.js';
import { renderPhotos } from './render-photos.js';
import { setCloseBigPhoto, setOpenBigPhoto } from './big-photo.js';
import { setOverlayForm, validateForm } from './form.js';
import { setScaleSizePhoto, setScaleEffectsPhoto } from './set-effects-photo.js';
const photosMoreUsers = getMockPhotos();
renderPhotos(photosMoreUsers);
setOpenBigPhoto();
setCloseBigPhoto();
validateForm();
setOverlayForm();
setScaleSizePhoto();
setScaleEffectsPhoto();
