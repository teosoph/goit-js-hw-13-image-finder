const BASE_URL = 'https://pixabay.com/api/'; // API_URL
// const query = ''; // что_искать
// const page = '1'; // номер_страницы
const KEY = '21420478-fd2340d70fd107c9f0617a1e9'; //твой_ключ

export default {
  async searchPhotos(query, page) {
    const rawResult = await fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${KEY}`,
    );
    if (!rawResult.ok) {
      throw rawResult;
    }
    const result = await rawResult.json();
    return result;
  },
};
