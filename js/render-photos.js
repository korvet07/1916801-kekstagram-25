const template = document.querySelector('#picture').content.querySelector('.picture');
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


