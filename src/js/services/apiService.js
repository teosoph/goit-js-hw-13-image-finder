const BASE_URL = 'https://pixabay.com/api/'; // API_URL
const QUERY = ''; // что_искать
const PAGE = '1'; // номер_страницы
const KEY = '21420478-fd2340d70fd107c9f0617a1e9'; //твой_ключ

export default {
  async fetchPhotos(PAGE) {
    const rawResult = await fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${QUERY}&page=${PAGE}&per_page=12&key=${KEY}`,
    );

    if (!rawResult.ok) {
      throw rawResult;
    }

    const result = await rawResult.json();

    return result;
  },
};
