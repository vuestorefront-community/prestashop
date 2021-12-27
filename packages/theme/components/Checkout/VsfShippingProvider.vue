<template>
  <div>
    <SfLoader :class="{ loading }" :loading="loading">
    <SfRadio
      v-e2e="'shipping-method'"
      v-for="method in shippingMethods"
      :key="method.value"
      :label="method.label"
      :value="method.value"
      :description="method.description"
      :selected ="selectedMethod"
      name="shippingMethod"
      class="form__radio shipping"
      @input="selectMethod(method.value)"
    >
      <div class="shipping__label">
        {{ method.label }}
      </div>

      <div class="shipping__description">
        {{ method.description }}
      </div>
    </SfRadio>
    </SfLoader>
    <SfLink
      @click.prevent="$emit('go-back')"
    >
      {{ $t('Go back') }}
    </SfLink>
    <SfButton
      v-e2e="'continue-to-billing'"
      :disabled="!selectedMethod"
      type="button"
      @click="goToBilling"
    >
      {{ $t('Continue to payment') }}
    </SfButton>
  </div>
</template>

<script>
import { SfButton, SfRadio, SfLink, SfLoader } from '@storefront-ui/vue';
import { ref, computed } from '@vue/composition-api';
import { useShippingProvider } from '@vue-storefront/prestashop';
import { shippingProviderGetters } from '@vue-storefront/prestashop/src/getters/shippingProviderGetters';

export default {
  name: 'VsfShippingProvider',
  props: ['selectedAddress'],
  components: {
    SfButton,
    SfRadio,
    SfLink,
    SfLoader
  },
  setup(props, context) {
    const selectedMethod = ref(null);
    const { load, state, save, loading } = useShippingProvider();
    const selectMethod = async(method) => {
      selectedMethod.value = method;
    };
    const goToBilling = async () => {
      await save({shippingMethodId: selectedMethod.value, addressId: props.selectedAddress });
      context.root.$router.push({ path: 'payment' });
    };
    const shippingProvidersList = computed(()=> state.value ? shippingProviderGetters.getShippingProvidersList(state.value) : []);
    const loadShippingProviders = async () => {
      await load();
    };
    loadShippingProviders();
    return {
      shippingMethods: shippingProvidersList,
      selectedMethod,
      selectMethod,
      goToBilling,
      loading
    };
  }
};
</script>

<style lang="scss" scoped>
.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
</style>
