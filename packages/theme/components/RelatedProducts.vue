<template>
  <SfSection :title-heading="title" class="section">
    <SfLoader :class="{ loading }" :loading="loading">
      <SfCarousel
        :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }"
        class="carousel"
      >
        <SfCarouselItem class="carousel__item" v-for="(product, i) in products" :key="i">
          <SfProductCard
            :title="productGetters.getName(product)"
            :image="productGetters.getCoverImage(product)"
            :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
            :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
            :max-rating="5"
            :score-rating="productGetters.getAverageRating(product)"
            :wishlistIcon="false"
            :isAddedToCart="isInCart({ product })"
            :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
            @click:add-to-cart="addItemToCart({ product, quantity: 1})"
          >
            <template #add-to-cart-icon v-if="productGetters.getIsVirtual(product)">
              <SfIcon
                key="more"
                icon="more"
                size="20px"
                color="white"
              />
            </template>
          </SfProductCard>
        </SfCarouselItem>
      </SfCarousel>
    </SfLoader>
  </SfSection>
</template>

<script lang="ts">

import {
  SfCarousel,
  SfProductCard,
  SfSection,
  SfLoader,
  SfIcon
} from '@storefront-ui/vue';

import {productGetters, useCart} from '@vue-storefront/prestashop';
import {useRouter} from '@nuxtjs/composition-api';
import { useUiNotification} from '~/composables';
import {useAddToCart} from '~/composables';

export default {
  name: 'RelatedProducts',
  setup(props, context) {
    const { isInCart } = useCart();
    const { addItemToCart } = useAddToCart();

    return {
      productGetters,
      addItemToCart,
      isInCart
    };
  },
  components: {
    SfCarousel,
    SfProductCard,
    SfSection,
    SfLoader,
    SfIcon
  },
  props: {
    title: String,
    products: Array,
    loading: Boolean
  }
};
</script>

<style lang="scss" scoped>
.section {
  margin-top: var(--spacer-base);
}

.carousel {
  margin: 0 calc(0 - var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.9375rem 0 2.4375rem 0;
  }
}

</style>
