import { getMockPhotos } from './data.js';
import { renderPhotos } from './render-photos.js';
import { setCloseBigPhoto, setOpenBigPhoto } from './big-photo.js';
const photosMoreUsers = getMockPhotos();
renderPhotos(photosMoreUsers);
setOpenBigPhoto();
setCloseBigPhoto();
