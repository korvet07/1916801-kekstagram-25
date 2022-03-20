import { getMockPhotos } from './data.js';
import { bigPhoto, renderPhotos } from './render-photos.js';
import { сloseBigPhotoEsc, сloseBigPhotoButton } from './full-screen-photos.js';
const photosMoreUsers = getMockPhotos();
сloseBigPhotoEsc(bigPhoto);
сloseBigPhotoButton(bigPhoto);
renderPhotos(photosMoreUsers);
