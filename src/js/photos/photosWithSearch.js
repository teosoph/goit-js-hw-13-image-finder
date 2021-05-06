import ApiService from '../services/apiService';
import photosListTemplate from '../../templates/photosList.hbs';
import '../../css/photos.css';

const apiService = new ApiService();

const galleryRef = document.querySelector('.photos-list');
const searchFormRef = document.querySelector('.search-form');
const inputRef = document.querySelector('.search-input');

// ------------- function of Appending photos --------------
function appendCardsTemplate(hits) {
  galleryRef.insertAdjacentHTML('beforeend', photosListTemplate(hits));
}

// ------------- function of Cleaning photos --------------
function clearCardsTemplate() {
  galleryRef.innerHTML = '';
}

// ------------- function of Searching photos --------------
function searchPhotos(query) {
  apiService.searchPhotos(query).then(hits => {
    clearCardsTemplate();
    appendCardsTemplate(hits);
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
