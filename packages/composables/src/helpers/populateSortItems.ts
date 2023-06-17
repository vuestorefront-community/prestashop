// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateSortItems = (sortItems: Array<any>) => {
  let selectedItem = '';
  const items = sortItems.map((sortItem) => {
    if (sortItem.current) {
      selectedItem = sortItem.urlParameter;
    }
    return {
      type: sortItem.entity,
      id: sortItem.urlParameter,
      value: sortItem.label,
      selected: sortItem.current
    };
  });

  return {
    items: items,
    selectedItem: selectedItem
  };
};

export default populateSortItems;
