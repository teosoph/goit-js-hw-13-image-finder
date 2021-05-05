import preloaderFactory from '../preloader/preloader';
import photosService from '../services/apiService';
import photosListTemplate from '../../templates/photosList.hbs';
import debounce from 'lodash.debounce';
import '../../css/photos.css';

const preloader = preloaderFactory('.preloader');

//  Class Photos template
class Photos {
  // Constructor of class Photos
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.photos = [];
    this.searchQuery = '';
    this.page = 0;
    this.observeEnable = true;
  }

  // Method of observerving of page-end and add new search-entries
  addObserver() {
    const observerOption = {
      rootMargin: '100px',
    };
    const observerHandler = debounce(entries => {
      if (!this.observeEnable) return;
      if (entries[0].isIntersecting) {
        this.page += 1;
        this.searchPhotos(this.query, this.page);
      }
    }, 200);

    const observer = new IntersectionObserver(observerHandler, observerOption);
    const observerElement = document.createElement('div');

    this.element.insertAdjacentElement('afterend', observerElement);
    observer.observe(observerElement);
  }

  // Method of rendering searched photos
  renderPhotos() {
    const photosToRender = this.photos.map(photo => {
      return {
        ...photo,
      };
    });
    const photosList = photosListTemplate(photosToRender);
    this.element.innerHTML = photosList;
  }

  // Method of searching photos
  searchPhotos(query) {
    this.page = 1;
    this.searchQuery = query;
    this.photos = [];
    this.photosService(this.searchQuery, this.page);
  }

  // Method of fetching photos
  async photosService(query = '', page) {
    this.searchQuery = query;
    console.log(query);

    try {
      const { hits } = await photosService.searchPhotos(query, page);
      console.log(hits);

      this.photos = [...this.photos, ...hits];
      this.renderPhotos();
      // console.log(hits);
    } catch (error) {
      // TODO add users notify for errors
      console.log(error);
    } finally {
      preloader.hide();
    }
  }

  // Method of initialisation
  init() {
    this.addObserver();
  }
}

// Creating a new object Photos
const photos = new Photos('.photos-list');
photos.init();

// Search__Handler function
const searchHandler = debounce(({ target }) => {
  if (target.name === 'search-query') {
    photos.searchPhotos(target.value);
    console.log(target.value);
  }
}, 1000);

//  addEventListener to SearchForm__querySelector
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('input', searchHandler);
