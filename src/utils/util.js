import config from '../config/config.json';

function generateFetchUrls(encodedSearchValue) {
  return {
    'Save-on-Foods': `${config.api_url}/GetSaveOnFoodsData?search=${encodedSearchValue}`,
    'Superstore': `${config.api_url}/GetSuperstoreData?search=${encodedSearchValue}`,
    'Pricesmart': `${config.api_url}/GetPricesmartData?search=${encodedSearchValue}`,
    'Your Independent Grocer': `${config.api_url}/GetYourIndependentGrocerData?search=${encodedSearchValue}`
  };
};

export function generateEncodedfetchUrls(searchValue) {
  if (typeof searchValue === 'string' && searchValue.length !== 0) {
    return generateFetchUrls(encodeURIComponent(searchValue));
  }

  //not a string or empty length
  return generateFetchUrls(encodeURIComponent(config.default_search_value));
}