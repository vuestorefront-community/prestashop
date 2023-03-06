// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateCountriesList = (countriesObs) => {
  const countries = JSON.parse(JSON.stringify(countriesObs));
  const populatedCountriesList = [];
  for (const id in countries) {
    const country = countries[id];
    const features = {
      id: country.id_country,
      name: country.name,
      iso: country.iso_code,
      needZipCode: country.need_zip_code,
      states: country.states,
      zipCodeFormat: country.zip_code_format,
      needIdentificationNumber: parseInt(country.need_identification_number)
    };
    populatedCountriesList.push(features);
  }
  return populatedCountriesList;
};

export default populateCountriesList;
