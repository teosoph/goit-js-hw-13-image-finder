import ApiService from '../services/apiService';
import photosListTemplate from '../../templates/photosList.hbs';
import '../../css/photos.css';

const apiService = new ApiService();

const galleryRef = document.querySelector('.photos-list');
const searchFormRef = document.querySelector('.search-form');
const inputRef = document.querySelector('.search-input');

// ------------- Method of appending photos --------------
const appendCardsTemplate = photos => {
  galleryRef.insertAdjacentHTML('beforeend', photosListTemplate(photos));
};

// ------------- Method of cleaning photos --------------
const clearCardsTemplate = () => {
  galleryRef.innerHTML = '';
};

// ------------- Method of searching photos --------------
function searchPhotos(event) {
  // event.preventDefault();
  // apiService.searchQuery = event.currentTarget.elements.query.value;
  apiService.resetPage();
  apiService.searchPhotos().then(hits => {
    clearCardsTemplate();
    appendCardsTemplate(hits);
  });
}

searchFormRef.addEventListener('submit', searchPhotos);

// ------------ Search__Handler function -----------
const searchHandler = ({ target }) => {
  if (target.name === 'search-query') {
    searchPhotos(target.value);
    console.log(target.value);
  }
};
inputRef.addEventListener('input', searchHandler);
