<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <SfHeading
      v-e2e="'addresses-heading'"
      :level="3"
      :title="$t('Addresses')"
      class="sf-heading--left sf-heading--no-underline title"
    />

    <div
      v-if='addressesList.length >= 1 && !addressFormVisibility'
    >
      <SfLoader :class="{ loading }" :loading="loading">
        <div
          v-for="address in addressesList"
          :key="address.id"
          class="shipping">
          <div class="shipping__content">
            <div class="shipping__address">
              <UserShippingAddress :address="address" />
            </div>
          </div>
          <div class="shipping__actions">
            <SfIcon
              icon="cross"
              color="gray"
              size="14px"
              role="button"
              class="smartphone-only"
              @click="removeAddress(address)"
            />
            <SfButton
              @click="editAddress(address)">
              {{ $t('Change') }}
            </SfButton>

            <SfButton
              class="color-light shipping__button-delete desktop-only"
              @click="removeAddress(address)">
              {{ $t('Delete') }}
            </SfButton>
          </div>
        </div>
      </SfLoader>
    </div>

      <address-form v-else-if='isEdit' edit :addressForEdit='addressForEdit' :addressesCount='addressesList.length' @toggle='toggleAddressFormVisibility' />
      <address-form v-else :addressesCount='addressesList.length' @toggle='toggleAddressFormVisibility' />

  </ValidationObserver>
</template>
<script>
import {
  SfHeading,
  SfTabs,
  SfButton,
  SfIcon,
  SfLoader,
  SfAddressPicker
} from '@storefront-ui/vue';
import UserShippingAddress from '~/components/UserShippingAddress';
import ShippingAddressForm from '~/components/MyAccount/ShippingAddressForm';
import { useUserShipping, userShippingGetters } from '@vue-storefront/prestashop';
import { ref, computed } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { ValidationObserver } from 'vee-validate';

export default {
  name: 'Addresses',
  components: {
    SfTabs,
    SfButton,
    SfIcon,
    UserShippingAddress,
    ShippingAddressForm,
    ValidationObserver,
    SfHeading,
    SfLoader,
    SfAddressPicker,
    AddressForm: () => import('../../components/AddressForm.vue')
  },
  setup() {
    const isFormSubmitted = ref(false);
    const { shipping, load, setDefaultAddress, loading, deleteAddress } = useUserShipping();
    const selectedAddress = ref(null);
    const addressFormVisibility = ref(false);
    const addressForEdit = ref(null);
    const isEdit = ref(false);
    const addressesList = computed(()=> shipping.value ? userShippingGetters.getAddresses(shipping.value) : []);
    const toggleAddressFormVisibility = (() => addressFormVisibility.value = !addressFormVisibility.value);
    const removeAddress = async (id) => {
      await deleteAddress({address: {id: id} });
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

    onSSR(async () => {
      await load();
    });

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
      goBack
    };
  }
};
</script>

<style lang='scss' scoped>

.message {
  font-family: var(--font-family--primary);
  line-height: 1.6;
  font-size: var(--font-size--base);
  margin: 0 0 var(--spacer-base);
}
.shipping-list {
  margin-bottom: var(--spacer-base);
}
.shipping {
  display: flex;
  padding: var(--spacer-xl) 0;
  border-top: 1px solid var(--c-light);

  &:last-child {
    border-bottom: 1px solid var(--c-light);
  }
  &__content {
    flex: 1;
    color: var(--c-text);
    font-size: var(--font-size--base);
    font-weight: 300;
    line-height: 1.6;
  }
  &__actions {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    @include for-desktop {
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
  }
  &__button-delete {
    color: var(--c-link);
    @include for-desktop {
      margin-left: var(--spacer-base);
    }
  }
  &__address {
    margin: 0;
    p {
      margin: 0;
    }
  }
  &__client-name {
    font-size: var(--font-size--base);
    font-weight: 500;
  }
}
.action-button {
  width: 100%;
  @include for-desktop {
    width: auto;
  }
}
.tab-orphan {
  @include for-mobile {
    ::v-deep .sf-tabs {
      &__title {
        display: none;
      }

      &__content {
        border: 0;
        padding: 0;
      }
    }
  }
}

.flex-row{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-top: 1px dotted grey ;
}

.address-picker{
  margin-bottom:2rem
}
</style>
