import ApiService from '../services/apiService';
import photosListTemplate from '../../templates/photosList.hbs';
import '../../css/photos.css';

const apiService = new ApiService();

const galleryRef = document.querySelector('.photos-list');
const searchFormRef = document.querySelector('.search-form');
const inputRef = document.querySelector('.search-input');

// ------------- function of Appending photos --------------
function appendPhotosTemplate(hits) {
  galleryRef.insertAdjacentHTML('beforeend', photosListTemplate(hits));
}

// ------------- function of innerHTML photos --------------
function photosInnerHTML() {
  galleryRef.innerHTML = '';
}

// ------------- function of Searching photos --------------
function searchPhotos(query) {
  apiService.searchPhotos(query).then(hits => {
    photosInnerHTML();
    appendPhotosTemplate(hits);
  });
}

searchFormRef.addEventListener('submit', searchPhotos);

// ------------ function of Search__Handler  -----------
const searchHandler = ({ target }) => {
  if (target.name === 'search-query') {
    searchPhotos(target.value);
    console.log(target.value);
  }
};
inputRef.addEventListener('input', searchHandler);
