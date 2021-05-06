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
const searchPhotos = event => {
  event.preventDefault();
  apiService.query = event.currentTarget.elements[0].value;
  console.dir(event.currentTarget.elements[0].value);
  if (apiService.query.trim() === '') {
    return alert('Please Enter Search Query');
  }
  apiService.resetPage();
  apiService.searchPhotos().then(hits => {
    photosInnerHTML();
    appendPhotosTemplate(hits);

    showMoreBtnRef.style.display = 'block';
  });
};

searchFormRef.addEventListener('submit', searchPhotos);

// ------------ function of Search__Handler  -----------
// const searchHandler = ({ target }) => {
//   if (target.name === 'search-query') {
//     searchPhotos(target.value);
//     console.log(target.value, ' ------searchHandler(query)');
//   }
// };
// inputRef.addEventListener('input', searchHandler);

// ----------------- function of Add more photos by Click on btn 'Show more' ----------------
function showMore() {
  apiService.searchPhotos().then(hits => {
    appendPhotosTemplate(hits);
  });
}
const showMoreBtnRef = document.querySelector('.show-more-button');
showMoreBtnRef.style.display = 'none';
showMoreBtnRef.addEventListener('click', showMore);
