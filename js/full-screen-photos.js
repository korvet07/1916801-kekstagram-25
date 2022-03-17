import {getMockPhotos} from './data.js';
const reviewBigPicture = document.querySelector('.big-picture');
reviewBigPicture.classList.remove('hidden');
const photosMoreUsers = getMockPhotos();
window.console.log(photosMoreUsers);
