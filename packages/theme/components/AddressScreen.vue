<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <slot name="heading"/>
    <form v-if='addressesList && addressesList.length >= 1 && !addressFormVisibility' @submit.prevent="handleSelectedAddressSubmit">
      <SfLoader :class="{ loading }" :loading="loading">
        <div>
          <SfAddressPicker v-model='selectedAddress' class='address-picker'>
            <div  v-for="address in addressesList" :key="address.id">
              <sf-address :name="address.id" v-if='!isFormSubmitted || isSelectedAddress(address.id)'>
                <UserShippingAddress :address="address"/>
                <div class='flex-row' v-if='!isFormSubmitted'>
                  <div>
                    <SfLink @click.prevent='editAddress(address)'>
                      {{ $t('Edit') }}
                    </SfLink>
                  </div>
                </div>
              </sf-address>
            </div>
          </SfAddressPicker>
          <div class="form" v-if="!isFormSubmitted">
            <div class='form__action'>
              <slot name="add-new-address">
                <SfButton
                  v-e2e="'add-new-address'"
                  :disabled="loading"
                  class="form__action-button"
                  @click='addNewAddress'
                >
                  {{ $t('Add new address') }}
                </SfButton>
              </slot>
              <slot name="custom-action">
                <SfButton
                  v-e2e="'custom-action'"
                  :disabled="loading || !selectedAddress"
                  class="form__action-button"
                  type="submit">
                  <slot name="custom-action-text"/>
                </SfButton>
              </slot>
            </div>
          </div>
        </div>
      </SfLoader>
    </form>
    <AddressForm v-else-if='isEdit' edit :addressForEdit='addressForEdit' :addressesCount='addressesList.length' @toggle='toggleAddressFormVisibility' />
    <AddressForm v-else :addressesCount='addressesList.length' @toggle='toggleAddressFormVisibility' />
    <VsfShippingProvider
      v-if="isFormSubmitted"
      :selected-address="selectedAddress"
      @go-back='goBack'/>
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
import { userShippingGetters, useUserShipping } from '@vue-storefront/prestashop';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationObserver, extend } from 'vee-validate';
import UserShippingAddress from '~/components/UserShippingAddress';

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
    UserShippingAddress,
    AddressForm: () => import('../../components/AddressForm.vue'),
    VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider')
  },
  setup () {
    const { shipping, load, setDefaultAddress, loading, deleteAddress } = useUserShipping();

    // only run client side
    // if (process.client) load();

    // onSSR(async () => {
    //   await load();
    // });

    const isFormSubmitted = ref(false);
    const selectedAddress = ref(null);
    const addressFormVisibility = ref(false);
    const addressForEdit = ref(null);
    const isEdit = ref(false);
    const addressesList = computed(()=> shipping.value ? userShippingGetters.getAddresses(shipping.value) : []);
    const toggleAddressFormVisibility = (() => addressFormVisibility.value = !addressFormVisibility.value);

    const removeAddress = async (id) => {
      await deleteAddress({address: {id: id} });
    };
    const isSelectedAddress = (id) => {
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
    const handleSelectedAddressSubmit = async() => {
      await setDefaultAddress({address: {id: selectedAddress.value} });
      isFormSubmitted.value = true;
    };
    const goBack = () => {
      isFormSubmitted.value = false;
    };

    return {
      addressesList,
      selectedAddress,
      loading,
      isFormSubmitted,
      addressFormVisibility,
      toggleAddressFormVisibility,
      handleSelectedAddressSubmit,
      removeAddress,
      editAddress,
      isEdit,
      addNewAddress,
      addressForEdit,
      isSelectedAddress,
      goBack
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
</style>
