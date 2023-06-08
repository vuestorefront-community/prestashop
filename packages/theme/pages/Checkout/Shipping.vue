<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <SfHeading
      v-e2e="'shipping-heading'"
      :level="3"
      :title="$t('Shipping')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <form v-if='addressesList.length >= 1 && !addressFormVisibility' @submit.prevent="handleSelectedShippingOptionSubmit">
      <div>
        <sf-address-picker v-model='selectedAddress' class='address-picker'>
          <div @change='selectAddress' v-for="address in addressesList" :key="address.id">
            <sf-address :name="address.id" v-if='!isFormSubmitted || isSelectedShippingOption(address.id)'>
              <div>
                <span>{{address.alias}}</span>
                <span>{{address.address1}}</span>
                <span>{{address.address2}}</span>
                <span>{{address.postcode}}</span>
                <span>{{address.city}}</span>
                <span>{{address.country}}</span>
                <span>{{address.phone}}</span>
              </div>
              <div class='flex-row' v-if='!isFormSubmitted'>
                <div>
                  <SfLink
                    @click.prevent='editAddress(address)'
                  >
                    {{ $t('Edit') }}
                  </SfLink>
                </div>
                <div>
                  <SfLink
                    @click.prevent='removeAddress(address.id)'
                  >
                    {{ $t('Remove') }}
                  </SfLink>
                </div>
              </div>
            </sf-address>

          </div>
        </sf-address-picker>

        <div class="shipping-items">
            <VsfShippingProvider
              v-if="selectedAddress"
              :selected-address="selectedAddress"
              @go-back='goBack'
              @shipping-method='selectShippingMethod'
            />
        </div>

        <div class="form" v-if="!isFormSubmitted">
          <div class='form__action'>
            <SfButton
              v-e2e="'add-new-address'"
              :disabled="loading"
              class="form__action-button"
              @click='addNewAddress'
            >
              {{ $t('Add new address') }}
            </SfButton>
            <SfButton
              v-e2e="'select-shipping'"
              :disabled="loading || !selectedAddress"
              class="form__action-button"
              type="submit"
            >
              {{ $t('Continue to payment') }}
            </SfButton>
          </div>
        </div>
      </div>
    </form>
    <address-form v-else-if='isEdit' edit :addressForEdit='addressForEdit' :addressesCount='addressesList.length' @toggle='toggleAddressFormVisibility' />
    <address-form v-else :addressesCount='addressesList.length' @toggle='toggleAddressFormVisibility' />
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfButton,
  SfAddressPicker,
  SfLink,
  SfLoader
} from '@storefront-ui/vue';
import { computed, ref } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { userShippingGetters, useUserShipping, useShippingProvider } from '@vue-storefront/prestashop';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationObserver, extend } from 'vee-validate';

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});
extend('digits', {
  ...digits,
  message: 'Please provide a valid phone number'
});

export default {
  name: 'Shipping',
  components: {
    SfHeading,
    SfButton,
    SfLink,
    SfAddressPicker,
    SfLoader,
    ValidationObserver,
    AddressForm: () => import('../../components/AddressForm.vue'),
    VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider')
  },
  setup (props, context) {
    const isFormSubmitted = ref(false);
    const { shipping, load, setDefaultAddress, loading, deleteAddress } = useUserShipping();
    const { save } = useShippingProvider();
    const selectedAddress = ref(null);
    const addressFormVisibility = ref(false);
    const addressForEdit = ref(null);
    const isEdit = ref(false);
    const selectedShippingMethod = ref(false);
    const addressesList = computed(()=> shipping.value ? userShippingGetters.getAddresses(shipping.value) : []);
    const toggleAddressFormVisibility = (() => addressFormVisibility.value = !addressFormVisibility.value);
    const removeAddress = async (id) => {
      await deleteAddress({address: {id: id} });
    };
    const isSelectedShippingOption = (id) => {
      if (selectedAddress.value && id === selectedAddress.value) {
        return true;
      }
      return false;
    };
    const addNewAddress = () => {
      addressForEdit.value = null;
      isEdit.value = false;
      toggleAddressFormVisibility();
    };
    const editAddress = (address) => {
      addressForEdit.value = address;
      isEdit.value = true;
      toggleAddressFormVisibility();
    };

    const handleSelectedShippingOptionSubmit = async() => {
      await save({ customQuery: { shippingMethodId: selectedShippingMethod.value, addressId: selectedAddress.value }});
      context.root.$router.push({ path: 'payment' });
    };
    const goBack = () => {
      isFormSubmitted.value = false;
    };

    onSSR(async () => {
      await load();
    });

    const selectAddress = async () =>{
      await setDefaultAddress({address: {id: selectedAddress.value} });
    };

    const selectShippingMethod = (method) => {
      selectedShippingMethod.value = method;
    };

    return {
      addressesList,
      selectedAddress,
      loading,
      isFormSubmitted,
      addressFormVisibility,
      toggleAddressFormVisibility,
      handleSelectedShippingOptionSubmit,
      removeAddress,
      editAddress,
      isEdit,
      addNewAddress,
      addressForEdit,
      isSelectedShippingOption,
      goBack,
      selectAddress,
      selectShippingMethod
    };
  }
};
</script>

<style lang="scss" scoped>
.form {
  --button-width: 100%;
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      color: var(--c-text);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    --button-width: auto;
  }
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        text-align: left;
      }
    }
    &--add-address {
      width: 100%;
      margin: 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);
    &:hover {
      color:  var(--c-white);
    }
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}

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

.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.flex-row{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-top: 1px dotted grey ;
}
.form__action>*{
  margin-right: 1rem;
}
.address-picker{
  margin-bottom:2rem
}

.shipping-items{
  margin-bottom: 2rem;
}
</style>
