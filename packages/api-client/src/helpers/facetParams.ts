
const replaceSpacesWithPlus = (word) => {
  return word.replace(/\s/g, '+');
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const facetParams = (filters) : string => {
  console.log('this flters ');
  console.log(filters);
  let urlString = '';
  let counter = 0;
  for (const facet in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, facet)) {
      const filterArray = filters[facet];
      if (filterArray.length !== 0) {
        // eslint-disable-next-line max-depth
        if (counter !== 0) {
          urlString += '/';
        }
        urlString += (replaceSpacesWithPlus(facet));

        // eslint-disable-next-line max-depth
        for (const filter of filterArray) {
          urlString += ('-' + replaceSpacesWithPlus(filter));
        }
        counter ++;
      }
    }
  }

  console.log(urlString);
  return urlString;
};

export {
  facetParams
};
