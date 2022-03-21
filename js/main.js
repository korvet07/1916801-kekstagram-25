import { getMockPhotos } from './data.js';
import { renderPhotos } from './render-photos.js';
import { setCloseBigPhoto, setOpenBigPhoto } from './big-photo.js';
const photosMoreUsers = getMockPhotos();
const photo = document.querySelector('.big-picture');
renderPhotos(photosMoreUsers);
setOpenBigPhoto(photo);
setCloseBigPhoto(photo);
