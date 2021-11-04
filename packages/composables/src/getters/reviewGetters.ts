import { ReviewGetters, AgnosticRateCount } from '@vue-storefront/core';
import { Review, ReviewItem } from '@vue-storefront/prestashop-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(review: Review): ReviewItem[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewId(review: ReviewItem): string {
  return review["id_product_comment"];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewAuthor(review: ReviewItem): string {
  return review["firstname"] + " " + review["lastname"];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewMessage(review: ReviewItem): string {
  return review["content"];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewRating(review: ReviewItem): number {
  return parseInt(review["grade"]);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewDate(review: ReviewItem): string {
  return review["date_add"];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalReviews(review: Review): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAverageRating(review: Review): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getRatesCount(review: Review): AgnosticRateCount[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getReviewsPage(review: Review): number {
  return 0;
}

export const reviewGetters: ReviewGetters<Review, ReviewItem> = {
  getItems,
  getReviewId,
  getReviewAuthor,
  getReviewMessage,
  getReviewRating,
  getReviewDate,
  getTotalReviews,
  getAverageRating,
  getRatesCount,
  getReviewsPage
};
