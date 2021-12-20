<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <SfHeading
      v-e2e="'shipping-heading'"
      :level="3"
      :title="$t('Shipping')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <form v-if='addressesList.length >= 1 && !toggleAddNewAddress' @submit.prevent="handleSelectedAddressSubmit()">
      <sf-address-picker v-model='selectedAddress'>
        <div  v-for="address in addressesList" :key="address.id">
        <sf-address :name="address.id">
          <div>
          <span>{{address.alias}}</span>
          <span>{{address.address1}}</span>
          <span>{{address.address2}}</span>
          <span>{{address.postcode}}</span>
          <span>{{address.city}}</span>
          <span>{{address.country}}</span>
          <span>{{address.phone}}</span>
          </div>
          <div class='flex-row'>
            <div>

              <SfLink
                @click.prevent='editAddress(address.id)'
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
      <div class="form">
        <div class='form__action'>
          <SfButton
            v-if="!isFormSubmitted"
            v-e2e="'add-new-address'"
            :disabled="loading"
            class="form__action-button"
            @click='changeAddNewAddressVisibility'
          >
            {{ $t('Add new address') }}
          </SfButton>
          <SfButton
            v-if="!isFormSubmitted"
            v-e2e="'select-shipping'"
            :disabled="loading || !selectedAddress"
            class="form__action-button"
            type="submit"
          >
            {{ $t('Select shipping method') }}
          </SfButton>
        </div>
      </div>
    </form>
    <form v-else  @submit.prevent="handleSubmit(handleFormSubmit)">
      <div class="form">
        <ValidationProvider
          name="alias"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'shipping-alias'"
            v-model.trim="form.alias"
            label="alias"
            name="alias"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>

        <ValidationProvider
          name="phone"
          rules=""
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'shipping-phone'"
            v-model.trim="form.phone"
            label="Phone number"
            name="phone"
            class="form__element form__element--half form__element--half-even"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="country"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            v-e2e="'shipping-country'"
            v-model="selectedCountry"
            label="Country"
            name="country"
            :disabled='loadingCountries'
            class="form__element form__element--half form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="countryOption in countriesList"
              :key="countryOption.id"
              :value="countryOption.id"
            >
              {{ countryOption.name }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        <ValidationProvider
          name="state"
          :rules="isStatesRequired ? 'required':''"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            v-e2e="'shipping-state'"
            v-model="form.id_state"
            label="State"
            name="state"
            :disabled='loadingCountries || !isStatesRequired '
            class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="stateOption in statesList"
              :key="stateOption.id_state"
              :value="stateOption.id_state"
            >
              {{ stateOption.name }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        <ValidationProvider
          name="city"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'shipping-city'"
            v-model.trim="form.city"
            label="City"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="zipCode"
          rules="required|min:2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'shipping-zipcode'"
            v-model.trim="form.postcode"
            label="Zip-code"
            name="zipCode"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="address"
          rules="required"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'shipping-address'"
            v-model.trim="form.address1"
            label="Address"
            name="address"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          name="address2"
          v-slot="{ errors }"
          slim
        >
          <SfInput
            v-e2e="'shipping-address2'"
            v-model.trim="form.address2"
            label="Address2"
            name="address2"
            class="form__element form__element--half form__element--half-even"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <div class="form">
        <div class="form__action"
             v-if="!isFormSubmitted"
             :disabled="loading"
        >
          <SfLink
            v-show=' addressesList.length >= 1'
            @click='toggleAddNewAddress'
          >
            {{ $t('Go back to addresses') }}
          </SfLink>
          <SfButton
            v-e2e="'select-shipping'"
            class="form__action-button"
            type="submit"
          >
            {{ $t('Add address') }}
          </SfButton>
        </div>
      </div>
    </form>
    <VsfShippingProvider
      v-if="isFormSubmitted "
      :selected-address="selectedAddress"
      @submit="$router.push(localePath({ name: 'payment' }))"
    />
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfAddressPicker,
  SfLink
} from '@storefront-ui/vue';
import { computed, ref, watch } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { userShippingGetters, useUserShipping, useCountryList, countryGetters } from '@vue-storefront/prestashop';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';

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
    SfInput,
    SfButton,
    SfSelect,
    SfAddressPicker,
    SfLink,
    ValidationProvider,
    ValidationObserver,
    VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider')
  },
  setup () {
    const isFormSubmitted = ref(false);
    const selectedCountry = ref(null);
    const { shipping, load, addAddress, setDefaultAddress, loading, deleteAddress } = useUserShipping();
    const { countries, loading: loadingCountries, load: loadCountries } = useCountryList();
    const form = ref({
      alias: '',
      address1: '',
      address2: '',
      city: '',
      // eslint-disable-next-line camelcase
      id_state: null,
      // eslint-disable-next-line camelcase
      id_country: computed(()=>selectedCountry.value ? selectedCountry.value : null),
      country: null,
      postcode: '',
      phone: null
    });
    const selectedAddress = ref(null);
    const toggleAddNewAddress = ref(false);
    const countriesList = computed(()=>countries.value ? countryGetters.getCountriesList(countries.value.countries) : []);
    const statesList = computed(()=> selectedCountry.value && countriesList.value.length >= 1 ? countriesList.value.find(el => el.id === selectedCountry.value).states : []);
    const isStatesRequired = computed(()=>(statesList.value && statesList.value.length >= 1));
    const changeAddNewAddressVisibility = (() => toggleAddNewAddress.value = !toggleAddNewAddress.value);
    const removeAddress = async (id) => {
      await deleteAddress({address: {id: id} });
    };
    const editAddress = (id) => console.log('edit address', id);
    const addressesList = computed(()=> shipping.value ? userShippingGetters.getAddresses(shipping.value) : []);
    watch(selectedCountry, (newVal) => form.value.country = countriesList.value.find(el => el.id === newVal).name);

    const handleFormSubmit = async () => {
      await addAddress({address: form.value});
      toggleAddNewAddress.value = false;
    };
    const handleSelectedAddressSubmit = async() => {
      await setDefaultAddress({address: {id: selectedAddress.value} });
      isFormSubmitted.value = true;
    };

    onSSR(async () => {
      await load();
      await loadCountries();
    });

    return {
      addressesList,
      selectedAddress,
      loading,
      loadingCountries,
      isFormSubmitted,
      form,
      countriesList,
      selectedCountry,
      statesList,
      handleFormSubmit,
      toggleAddNewAddress,
      changeAddNewAddressVisibility,
      handleSelectedAddressSubmit,
      isStatesRequired,
      removeAddress,
      editAddress
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
</style>
