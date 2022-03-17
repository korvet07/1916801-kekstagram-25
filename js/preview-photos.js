import {getMockPhotos} from './data.js';
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photosMoreUsers = getMockPhotos();
const elementGalleryPhotos = document.querySelector('.pictures');
const elementGalleryPhotosFragment = document.createDocumentFragment();
photosMoreUsers.forEach(({url, likes, comments}) =>{
  const pictureTemplateElement = pictureTemplate.cloneNode(true);
  pictureTemplateElement.querySelector('.picture__img').setAttribute('src', url);
  pictureTemplateElement.querySelector('.picture__likes').textContent = likes;
  pictureTemplateElement.querySelector('.picture__comments').textContent = comments.length;
  window.console.log(pictureTemplateElement);
  elementGalleryPhotosFragment.append(pictureTemplateElement);

});
elementGalleryPhotos.append(elementGalleryPhotosFragment);
