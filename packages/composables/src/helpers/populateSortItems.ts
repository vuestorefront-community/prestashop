// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateSortItems = (sortItems: Array<any>) => {
  return sortItems.map((sortItem) => ({
    type: sortItem.entity,
    id: sortItem.urlParameter,
    value: sortItem.label,
    selected: sortItem.current
  }));
};

export default populateSortItems;
