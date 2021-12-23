<template>
  <div>
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

    <SfButton
      v-e2e="'continue-to-billing'"
      :disabled="!selectedMethod"
      type="button"
      @click="$emit('submit')"
    >
      {{ $t('Continue to billing') }}
    </SfButton>
  </div>
</template>

<script>
import { SfButton, SfRadio } from '@storefront-ui/vue';
import { ref, computed } from '@vue/composition-api';
import { useShippingProvider } from '@vue-storefront/prestashop';
import { shippingProviderGetters } from '@vue-storefront/prestashop/src/getters/shippingProviderGetters';

export default {
  name: 'VsfShippingProvider',
  props: ['selectedAddress'],
  components: {
    SfButton,
    SfRadio
  },
  setup(props) {
    const selectedMethod = ref(null);
    const { load, state, save } = useShippingProvider();
    const selectMethod = async(method) => {
      await save({shippingMethodId: method, addressId: props.selectedAddress });
      selectedMethod.value = method;
    };
    const shippingProvidersList = computed(()=> state.value ? shippingProviderGetters.getShippingProvidersList(state.value) : []);
    const loadShippingProviders = async () => {
      await load();
    };
    loadShippingProviders();
    return {
      shippingMethods: shippingProvidersList,
      selectedMethod,
      selectMethod
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
