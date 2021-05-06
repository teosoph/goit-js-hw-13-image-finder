import ApiService from '../services/apiService';
import photosListTemplate from '../../templates/photosList.hbs';
import '../../css/photos.css';

const apiService = new ApiService();

const searchFormRef = document.querySelector('.search-form');
const galleryRef = document.querySelector('.photos-list');

// ------------- Method of appending photos --------------
const appendCardsTemplate = imgs => {
  galleryRef.insertAdjacentHTML('beforeend', photosListTemplate(imgs));
};

// ------------- Method of cleaning photos --------------
const clearCardsTemplate = () => {
  galleryRef.innerHTML = '';
};

// ------------- Method of searching photos --------------
function searchPhotos(event) {
  event.preventDefault();
  apiService.searchQuery = event.currentTarget.elements.query.value;
  apiService.resetPage();
  apiService.fetchImages().then(hits => {
    clearCardsTemplate();
    appendCardsTemplate(hits);
  });
}

searchFormRef.addEventListener('submit', searchPhotos);
