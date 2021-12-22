<template>
  <div>
    <SfRadio
      v-e2e="'payment-method'"
      v-for="method in paymentMethods"
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
    </SfRadio>
  </div>
</template>

<script>
import { SfButton, SfRadio } from '@storefront-ui/vue';
import { ref, onBeforeMount, computed } from '@vue/composition-api';
import { usePayment } from '@vue-storefront/prestashop';
import { paymentProviderGetters } from '@vue-storefront/prestashop/src/getters/paymentProviderGetters';

export default {
  name: 'VsfPaymentProvider',

  components: {
    SfButton,
    SfRadio
  },

  setup() {
    const selectedMethod = ref(null);
    const selectMethod = (method)=> {
      selectedMethod.value = method;
    };
    const { load, shipping: payment } = usePayment();
    onBeforeMount(async()=>{
      await load();
    });
    return {
      paymentMethods: computed(()=> payment.value ? paymentProviderGetters.getPaymentProvidersList(payment.value) : []),
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
