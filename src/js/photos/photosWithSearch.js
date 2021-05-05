import preloaderFactory from '../preloader/preloader';
import photosService from '../services/apiService';
import photosListTemplate from '../../templates/photosList.hbs';
import debounce from 'lodash.debounce';
import '../../css/photos.css';

const preloader = preloaderFactory('.preloader');

const searchForm = document.querySelector('.search-form');

class Photos {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.photos = [];
    this.currentPhotos = [];
    this.searchQuery = '';
    this.page = 0;
    this.observeEnable = true;
  }

  filterByQuery(query = '') {
    this.observeEnable = false;
    this.currentPhotos = query
      ? this.photos.filter(photo =>
          photo.tags.toLowerCase().includes(query.toLowerCase()),
        )
      : this.photos;

    this.renderPhotos();
  }

  addObserver() {
    const observerOption = {
      rootMargin: '100px',
    };
    const observerHandler = debounce(entries => {
      if (!this.observeEnable) return;
      if (entries[0].isIntersecting) {
        this.page += 1;
        this.fetchPhotos(this.page);
      }
    }, 200);

    const observer = new IntersectionObserver(observerHandler, observerOption);
    const observerElement = document.createElement('div');

    this.element.insertAdjacentElement('afterend', observerElement);
    observer.observe(observerElement);
  }

  renderPhotos() {
    const photosWithPosterPath = this.currentPhotos.map(photo => {
      return {
        ...photo,
      };
    });
    const photosList = photosListTemplate(photosWithPosterPath);
    this.element.innerHTML = photosList;
  }

  async fetchPhotos(page) {
    try {
      const { hits } = await photosService.fetchPhotos(page);
      this.photos = [...this.photos, ...hits];
      this.currentPhotos = this.photos;
      this.renderPhotos();
      // console.log(hits);
    } catch (error) {
      // TODO add users notify for errors
      console.log(error);
    } finally {
      preloader.hide();
    }
  }

  init() {
    this.addObserver();
  }
}

const photos = new Photos('.photos-list');
photos.init();

const searchHandler = ({ target }) => {
  if (target.name === 'search-query') {
    photos.filterByQuery(target.value);
    console.log(target.value);
  }
};

searchForm.addEventListener('input', searchHandler);
