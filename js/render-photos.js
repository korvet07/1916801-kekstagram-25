import {getMockPhotos} from './data.js';
const template = document.querySelector('#picture').content.querySelector('.picture');


const bigPhoto = document.getElementsByClassName('big-picture');

const container = document.querySelector('.pictures');
const elementFragment = document.createDocumentFragment();
const renderElement = (item) => {
  const element = template.cloneNode(true);
  element.querySelector('.picture__img').setAttribute('src', item.url);
  element.querySelector('.picture__likes').textContent = item.likes;
  element.querySelector('.picture__comments').textContent = item.comments.length;
  return element;
};


export const renderPhotos= (items) => {
  items.forEach((item) => {
    elementFragment.append(renderElement(item));
  });
  return container.append(elementFragment);
};
const photosMoreUsers = getMockPhotos();
window.console.log(photosMoreUsers);
const renderElementBigPhotos =(item) =>{
  const elementbigPhoto = bigPhoto[0].cloneNode(true);
  elementbigPhoto.querySelector('.big-picture__img>img').setAttribute('src', item.url);
  elementbigPhoto.querySelector('.likes-count').textContent = item.likes;
  elementbigPhoto.querySelector('.comments-count').textContent = item.comments.length;
  elementbigPhoto.querySelector('.social__caption').textContent = item.description;
  elementbigPhoto.querySelector('.social__picture').setAttribute('src', item.comments[0].avatar);
  elementbigPhoto.querySelector('.social__picture').setAttribute('alt', item.comments[0].name);
  elementbigPhoto.querySelector('.social__text').textContent = item.comments[0].message;
  return elementbigPhoto;
};
renderPhotos(photosMoreUsers);

const thumbnails = document.querySelectorAll('.picture');
thumbnails.forEach((thumbnail) =>{
  thumbnail.addEventListener('click',()=>{
    const elementbigPhoto = renderElementBigPhotos();
    bigPhoto[0].replaceWith(elementbigPhoto);
  });
  thumbnail.addEventListener('click', () =>{
    bigPhoto[0].classList.remove('hidden');
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
    document.body.classList.add('modal-open');
  });
  bigPhoto[0].querySelector('#picture-cancel').addEventListener('click',()=>{
    bigPhoto[0].classList.add('hidden');
    document.querySelector('.social__comment-count').classList.remove('hidden');
    document.querySelector('.comments-loader').classList.remove('hidden');
    document.body.classList.remove('modal-open');
  });

});

if(bigPhoto[0].classList.contains('hidden')){
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      bigPhoto[0].classList.add('hidden');
      document.querySelector('.social__comment-count').classList.remove('hidden');
      document.querySelector('.comments-loader').classList.remove('hidden');
      document.body.classList.remove('modal-open');
    }
  });
}

