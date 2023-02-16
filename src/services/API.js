import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32875867-65814ebf8b23bcdf5668f7744';

export async function getPhotos(search, page) {
  const find = [search].join(' ');
  const numberPage = [page].join('');
  const searchParams = {
    params: {
      q: `${find}`,
      page: `${Number(numberPage)}`,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
      key: KEY,
    },
  };
  const { data } = await axios.get(BASE_URL, searchParams);
  return data;
}
