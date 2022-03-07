import {AgnosticCategoryTree} from '@vue-storefront/core';

const slugify = (url) => {
  const lastPart = url.substring(url.lastIndexOf('/') + 1);
  return lastPart.match(/^[0-9]+-(.*)$/)[1];
};

const treeObject = (category, items) : AgnosticCategoryTree => {
  return {
    label: category.name,
    slug: slugify(category.link),
    items: items,
    isCurrent: false,
    count: 0
  };
};

const populateSecondLevel = (categories: Array<any>) : AgnosticCategoryTree[] => {
  return categories.map((category): AgnosticCategoryTree => (
    treeObject(category, null)
  ));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateCategoryTree = (categories: any) : AgnosticCategoryTree => {
  const children = categories.children.map((category) : AgnosticCategoryTree => (
    treeObject(category, category.children ? populateSecondLevel(category.children) : null)
  ));

  return treeObject(categories, children);
};

export default populateCategoryTree;
