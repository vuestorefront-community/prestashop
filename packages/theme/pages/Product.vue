<template>
  <SfLoader
    :class="{ 'loading--categories': productLoading }"
    :loading="productLoading && !isAnFilterUpdate">
    <div id="product" >
      <SfBreadcrumbs class="breadcrumbs desktop-only" :breadcrumbs="breadcrumbs" />
      <div class="product">
        <LazyHydrate when-idle>
          <SfGallery :images="productGallery" class="product__gallery" />
        </LazyHydrate>

        <div class="product__info">
          <div class="product__header">
            <SfHeading
              :title="productGetters.getName(product)"
              :level="3"
              class="sf-heading--no-underline sf-heading--left"
            />
            <SfIcon
              icon="drag"
              size="xxl"
              color="var(--c-text-disabled)"
              class="product__drag-icon smartphone-only"
            />
          </div>
          <div class="product__price-and-rating">
            <SfPrice
              :regular="$n(productGetters.getPrice(product).regular, 'currency')"
              :special="$n(productGetters.getPrice(product).regular, 'currency') === $n(productGetters.getPrice(product).special, 'currency')? '': $n(productGetters.getPrice(product).special, 'currency')"
            />
            <div>
              <div class="product__rating">
                <SfRating :score="averageRating" :max="5" @onClick="alert(2)" />
                <a v-if="!!totalReviews" href="#" class="product__count">({{ totalReviews }})</a>
              </div>
              <SfButton class="sf-button--text">{{ $t('Read all reviews') }}</SfButton>
            </div>
          </div>
          <div>
            <p
              class="product__description desktop-only"
              v-html="productGetters.getShortDescription(product)"
            ></p>
            <template
              v-for="(option, optionKey) in options"
            >
              <div
                v-if="option.group_type === 'color'"
                class="product__colors desktop-only"
              >
                <p class="product__color-label">{{ $t('Color') }}:</p>
                <SfColor
                  v-for="(color, i) in option.attributes"
                  :key="i"
                  :selected='color.selected'
                  :color="color.html_color_code"
                  class="product__color"
                  @click="updateFilter({ [option.name.replace(/\s+/g, '_')]: `${optionKey}-${i}-${color.name.replace(/[\s&/#,+()$~%.':*?<>{}]/g, '_')}`})"
                />
              </div>

              <SfSelect
                v-else
                :key="optionKey"
                @input="input => updateFilter({ [option.name.replace(/\s+/g, '_')]: input})"
                :label="option.name"
                :value="selectedAttribute(optionKey)"
                :class="`sf-select--underlined product__select-${optionKey.toLowerCase()}`"
              >
                <SfSelectOption
                  v-for="(attribute, attributeKey) in option.attributes"
                  :key="attributeKey"
                  :value="`${optionKey}-${attributeKey}-${attribute.name.replace(/[\s&/#,+()$~%.':*?<>{}]/g, '_')}`"
                >{{attribute.name}}</SfSelectOption>
              </SfSelect>
            </template>

            <SfAddToCart
              v-e2e="'product_add-to-cart'"
              :stock="stock"
              v-model="qty"
              :disabled="loading"
              :canAddToCart="stock > 0"
              class="product__add-to-cart"
              @input="handleSpinUpDown($event)"
            >
              <template #add-to-cart-btn>
                <SfButton
                  :disabled="loading || quantity <= 0 || disableAddToCart"
                  class="sf-add-to-cart__button"
                  v-on="$listeners"
                  @click="addingToCart({ product, quantity: parseInt(qty) } )"
                >
                  {{ $t('Add to cart') }}
                </SfButton>
              </template>
            </SfAddToCart>

            <div v-if="disableAddToCart" class="product-message">
              {{productMessage}}
            </div>
          </div>

          <LazyHydrate when-idle>
            <SfTabs :open-tab="1" class="product__tabs">
              <SfTab title="Description">
                <div class="product__description" v-html="productGetters.getDescription(product)"></div>
                <SfProperty
                  class="product__property"
                  name="Category"
                  :value="productGetters.getCategory(product)"
                ></SfProperty>

                <SfProperty
                  v-for="(property, i) in productGetters.getProductInfo(product)"
                  :key="i"
                  :name="property.name"
                  :value="property.value"
                  class="product__property"
                >
                  <template v-if="property.name === 'Category'" #value>
                    <SfButton class="product__property__button sf-button--text">{{ property.value }}</SfButton>
                  </template>
                </SfProperty>
              </SfTab>
              <SfTab title="Read reviews">
                <SfButton
                  v-if="isAuthenticated"
                  class="before-results__button"
                  style="margin-bottom:60px"
                  @click="addReviewModal=true"
                >ADD REVIEW</SfButton>
                <p  v-else>You must be logged in to write comment</p>
                <!--              TODO: loop over review type instead of API structure -->
                <SfReview
                  v-for="review in reviews"
                  :key="reviewGetters.getReviewId(review)"
                  :author="reviewGetters.getReviewAuthor(review)"
                  :date="reviewGetters.getReviewDate(review)"
                  :message="reviewGetters.getReviewMessage(review)"
                  :rating="reviewGetters.getReviewRating(review)"
                  read-more-text="Read more"
                  hide-full-text="Read less"
                  class="product__review"
                />
                <LazyHydrate>
                  <SfPagination
                    v-if="Math.ceil(totalReviews/totalReviewPerPage) > 1"
                    class="products__pagination desktop-only"
                    :current="currentPage"
                    :total="Math.ceil(totalReviews/totalReviewPerPage)"
                    :visible="5"
                  >
                    <template #number="{page}">
                    <span
                      class="sf-pagination__item arrow"
                      :class="{'current': currentPage === page}"
                      @click="goNext(page)"
                    >{{page}}</span>
                    </template>

                    <template #next="{isDisabled, go, next}">
                      <span @click="goNext(currentPage + 1)" class="arrow">&#8594</span>
                    </template>

                    <template #prev="{isDisabled, go, prev}">
                      <span @click="goNext(currentPage - 1)" class="arrow">&#8592</span>
                    </template>
                  </SfPagination>
                </LazyHydrate>
              </SfTab>
              <SfTab title="Additional Information" class="product__additional-info">
                <div class="product__additional-info">
                  <p class="product__additional-info__title">{{ $t('Brand') }}</p>
                  <p>{{ productGetters.getBrand(product) }}</p>
                </div>
              </SfTab>
            </SfTabs>
          </LazyHydrate>
        </div>
      </div>

      <LazyHydrate when-visible>
        <RelatedProducts :products="relatedProducts" :loading="relatedLoading" title="Match it with" />
      </LazyHydrate>

      <LazyHydrate v-if="addReviewModal" >
        <AddReview :productId="productGetters.getId(product)" @close="addReviewModal = false" />
      </LazyHydrate>

      <LazyHydrate when-visible>
        <InstagramFeed />
      </LazyHydrate>
    </div>
  </SfLoader>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfIcon,
  SfImage,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfButton,
  SfColor,
  SfPagination,
  SfLoader
} from '@storefront-ui/vue';

import InstagramFeed from '~/components/InstagramFeed.vue';
import AddReview from '~/components/AddReview.vue';
import RelatedProducts from '~/components/RelatedProducts.vue';
import { ref, computed } from '@nuxtjs/composition-api';
import {
  useProduct,
  useCart,
  productGetters,
  useReview,
  useUser,
  reviewGetters,
  useCheckProduct
} from '@vue-storefront/prestashop';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import cacheControl from './../helpers/cacheControl';
import useUiNotification from '~/composables/useUiNotification';

export default {
  name: 'Product',
  transition: 'fade',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5
  }),
  setup(props, context) {
    const qty = ref(1);
    const { id, isAnFilterUpdate } = context.root.$route.params;
    const { products, search, loading: productLoading } = useProduct('products');
    const { product: checkedProduct, check: checkProduct } = useCheckProduct();
    const {
      products: featureProducts,
      search: searchRelatedProducts,
      loading: relatedLoading
    } = useProduct('relatedProducts');
    const { addItem, loading } = useCart();
    const { reviews: productReviews, search: searchReviews } = useReview(
      'productReviews'
    );
    const { send: sendNotification } = useUiNotification();
    // const pagination = computed(() => facetGetters.getPagination(result.value));
    const { isAuthenticated } = useUser();

    const selectedAttrId = ref(false);
    const selectedGroupId = ref(false);
    const disableAddToCart = ref(false);
    const productMessage = ref(false);

    const product = computed(
      () =>
        productGetters.getFiltered(products.value, {
          master: true,
          attributes: context.root.$route.query
        })[0]
    );
    const options = computed(() =>
      productGetters.getAttributes(product.value)
    );
    const categories = computed(() =>
      productGetters.getCategoryIds(product.value)
    );
    const reviews = computed(() =>
      reviewGetters.getItems(productReviews.value.psdata)
    );
    const quantity = computed(() =>
      productGetters.getQuantity(product.value)
    );
    const selectedAttribute = (optionKey) => {
      const option = options.value[Number(optionKey)];
      const attrs = option.attributes;
      for (const key in attrs) {
        if (attrs[key].selected) {
          selectedAttrId.value = key;
          selectedGroupId.value = optionKey;
          return `${optionKey}-${key}-${attrs[key].name.replace(/[\s&/#,+()$~%.':*?<>{}]/g, '_')}`;
        }
      }
      return null;
    };

    // TODO: Breadcrumbs are temporary disabled because productGetters return undefined. We have a mocks in data
    // const breadcrumbs = computed(() => productGetters.getBreadcrumbs ? productGetters.getBreadcrumbs(product.value) : props.fallbackBreadcrumbs);
    const productGallery = computed(() =>
      productGetters.getGallery(product.value).map((img) => ({
        mobile: { url: img.small },
        desktop: { url: img.normal },
        big: { url: img.big },
        alt: product.value.name ? product.value.name : 'product alt'
      }))
    );

    onSSR(async () => {
      let variant = context.root.$route.query;
      if (variant && Object.keys(variant).length === 0) {
        variant = null;
      }
      await search({ id, variant: variant });
      await searchRelatedProducts({ featured: true });
      await searchReviews({ productId: id, page: '1' });
    });

    const updateFilter = (filter) => {
      const variant = context.root.$route.query;
      context.root.$router.push({
        name: context.root.$route.name,
        params: {
          ...context.root.$route.params,
          isAnFilterUpdate: 'true'
        },
        query: {
          ...variant,
          ...filter
        }
      });
    };

    const totalReviews = computed(() =>
      reviewGetters.getTotalReviews(productReviews.value.psdata)
    );

    const totalReviewPerPage = computed(() =>
      reviewGetters.getReviewsPage(productReviews.value.psdata)
    );

    const goNext = (item) => {
      if (item < 1 || Math.ceil(totalReviews / totalReviewPerPage) < item) {
        return false;
      }

      this.currentPage = item;
      onSSR(async () => {
        searchReviews({ productId: this.id, page: this.currentPage });
      });
    };

    return {
      selectedAttribute,
      updateFilter,
      searchReviews,
      sendNotification,
      product,
      reviews,
      productReviews,
      reviewGetters,
      averageRating: computed(() =>
        productGetters.getAverageRating(product.value)
      ),
      totalReviews,
      totalReviewPerPage,
      relatedProducts: computed(() =>
        productGetters.getFeaturedProductsFiltered(featureProducts.value)
      ),
      relatedLoading,
      options,
      categories,
      qty,
      addItem,
      loading,
      productLoading,
      productGetters,
      productGallery,
      isAuthenticated,
      goNext,
      quantity,
      productMessage,
      disableAddToCart,
      checkedProduct,
      checkProduct,
      selectedAttrId,
      selectedGroupId,
      isAnFilterUpdate
    };
  },
  methods: {
    async addingToCart(Productdata) {
      await this.addItem(Productdata).then(() => {
        this.sendNotification({
          key: 'product_added',
          message: `${Productdata.product.name} has been successfully added to your cart.`,
          type: 'success',
          title: 'Product added!',
          icon: 'check'
        });
        this.qty = 1;
      });
    },
    async handleSpinUpDown(event) {
      if (!this.selectedGroupId || !this.selectedAttrId) {
        if (this.product.groups.length === 0) {
          await this.checkProduct(this.product.id, 0, 0, event);
        } else {
          const defaultGroupId = Object.keys(this.product.groups)[0];
          const defaultAttr = this.product.groups[defaultGroupId].default;

          await this.checkProduct(this.product.id, defaultGroupId, defaultAttr, event);
        }
      } else {
        await this.checkProduct(this.product.id, this.selectedGroupId, this.selectedAttrId, event);
      }

      if (this.checkedProduct.availability === 'unavailable') {
        this.disableAddToCart = true;
        this.productMessage = this.checkedProduct.availability_message;
      } else {
        this.disableAddToCart = false;
      }
    }
  },
  components: {
    SfAlert,
    SfColor,
    SfProperty,
    SfHeading,
    SfPagination,
    SfPrice,
    SfRating,
    SfSelect,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    AddReview,
    RelatedProducts,
    LazyHydrate,
    SfLoader
  },
  data() {
    return {
      currentPage: 1,
      addReviewModal: false,
      breadcrumbs: [
        {
          text: 'Home',
          route: {
            link: '#'
          }
        },
        {
          text: 'Category',
          route: {
            link: '#'
          }
        }
      ],
      stock: 1
    };
  }
};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}
.arrow {
  cursor: pointer;
  font-size: 26px;
}
.product {
  @include for-desktop {
    display: flex;
  }
  &__pagination {
    display: flex;
    justify-content: flex-start;
    margin: var(--spacer-xl) 0 0 0;
  }
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

.product-message{
  margin-top: 2rem;
  padding: 10px;
  background-color: #ebcccc;
  color: #a94442;
  border-radius: 2px;
}
</style>
