const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '21195458-19b2d8fc62244b43de198b4d0';

// ------------- Class ApiService template ------------------
export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
  }
  // ------------------------- Search Promise & then ---------------------------------------------------
  searchPhotos() {
    const searchUrl = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=${API_KEY}`;
    return fetch(searchUrl)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  // ------------------------- Get & Set  queries -------------------
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  // ---------------------  Increment & reset page -----------------------
  incrementPage() {
    this.pageNumber += 1;
  }
  resetPage() {
    this.pageNumber = 1;
  }
}
