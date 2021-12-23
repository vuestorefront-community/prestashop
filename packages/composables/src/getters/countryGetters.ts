import { populateCountriesList } from '../helpers';

function getCountriesList(countries:any[]): any[] {
  if (!countries || countries.length === 0) {
    return [];
  }
  return populateCountriesList(countries);
}

export const countryGetters = {
  getCountriesList
};
