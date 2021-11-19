
const replaceDashWithSpace = (word) => {
  return word.replace('-', ' ');
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const facetParams = (filters) : string => {
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
        urlString += (replaceDashWithSpace(facet));

        // eslint-disable-next-line max-depth
        for (const filter of filterArray) {
          urlString += ('-' + replaceDashWithSpace(filter));
        }
        counter ++;
      }
    }
  }

  return urlString;
};

export {
  facetParams
};
