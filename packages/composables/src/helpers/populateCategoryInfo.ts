// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateCategoryInfo = (rawCategory: any) => {
  return {
    metaTitle: rawCategory.meta_title,
    metaDescription: rawCategory.meta_description,
    metaKeywords: rawCategory.meta_keywords,
    categoryLabel: rawCategory.name
  };
};

export default populateCategoryInfo;
