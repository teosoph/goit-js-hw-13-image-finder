import preloaderFactory from '../preloader/preloader';
import photosService from '../services/apiService';
import photosListTemplate from '../../templates/photosList.hbs';
import '../../css/photos.css';

const preloader = preloaderFactory('.preloader');

const photosListRef = document.querySelector('.photos-list');

const renderList = photos => {
  const photosWithPosterPath = photos.map(photos => {
    return {
      ...photos,
      // webformatURL: `${photos.webformatURL}`,
    };
  });
  const photosList = photosListTemplate(photosWithPosterPath);
  photosListRef.innerHTML = photosList;
};

const fetchPhotos = async () => {
  try {
    const { hits } = await photosService.fetchPhotos();
    console.log(hits);
    renderList(hits);
  } catch (error) {
    // TODO add users notify for errors
    console.log(error);
  } finally {
    preloader.hide();
  }
};

fetchPhotos();

// webformatURL - ссылка на маленькое изображение для списка карточек
// largeImageURL - ссылка на большое изображение (смотри пункт 'дополнительно')
// likes - количество лайков
// views - количество просмотров
// comments - количество комментариев
// downloads - количество загрузок
