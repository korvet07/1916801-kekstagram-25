import { getMockPhotos } from './data.js';
import { bigPhoto, renderPhotos } from './render-photos.js';
import { сloseBigPhoto } from './event-handler.js';
const photosMoreUsers = getMockPhotos();
сloseBigPhoto(bigPhoto);
renderPhotos(photosMoreUsers);
