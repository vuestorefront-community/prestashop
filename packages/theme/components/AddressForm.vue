<template>
  <ValidationObserver v-slot="{ handleSubmit }">
  <form @submit.prevent="handleSubmit(handleFormSubmit)">
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
          v-if='Boolean($props.addressesCount)'
          @click='toggleAddNewAddress'
        >
          {{ $t('Go back to addresses') }}
        </SfLink>
        <SfButton
          v-if='$props.edit'
          v-e2e="'select-shipping'"
          class="form__action-button"
          type="submit"
        >
          {{ $t('Edit address') }}
        </SfButton>
        <SfButton
          v-else
          v-e2e="'select-shipping'"
          class="form__action-button"
          type="submit"
        >
          {{ $t('Add address') }}
        </SfButton>
      </div>
    </div>
  </form>
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
import { useUserShipping, useCountryList, countryGetters } from '@vue-storefront/prestashop';
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
  name: 'AddressForm',
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
  props: {
    edit: {
      type: Boolean,
      required: false,
      default: false
    },
    addressesCount: {
      type: Number,
      required: true,
      default: 0
    },
    addressForEdit: {
      type: Object,
      required: false,
      default: () => {
        return {
          id: null,
          alias: '',
          address1: '',
          address2: '',
          city: '',
          // eslint-disable-next-line camelcase
          id_state: null,
          // eslint-disable-next-line camelcase
          id_country: null,
          country: null,
          postcode: '',
          phone: null
        };
      }
    }
  },
  setup(props, context) {
    const isFormSubmitted = ref(false);
    const selectedCountry = ref(null);
    const { addAddress, loading, deleteAddress, updateAddress } = useUserShipping();
    const { countries, loading: loadingCountries, load: loadCountries } = useCountryList();
    const form = ref({
      // eslint-disable-next-line camelcase
      id_address: props.addressForEdit.id,
      alias: props.addressForEdit.alias,
      address1: props.addressForEdit.address1,
      address2: props.addressForEdit.address2,
      city: props.addressForEdit.city,
      // eslint-disable-next-line camelcase
      id_state: props.addressForEdit.id_state,
      // eslint-disable-next-line camelcase
      id_country: props.addressForEdit.id_country,
      country: props.addressForEdit.country,
      postcode: props.addressForEdit.postcode,
      phone: props.addressForEdit.phone
    });
    const countriesList = computed(() => countries.value ? countryGetters.getCountriesList(countries.value.countries) : []);
    const statesList = computed(() => selectedCountry.value && countriesList.value.length >= 1 ? countriesList.value.find(el => el.id === selectedCountry.value).states : []);
    const isStatesRequired = computed(() => (statesList.value && statesList.value.length >= 1));
    const removeAddress = async (id) => {
      await deleteAddress({ address: { id: id } });
    };
    watch(selectedCountry, () => {
      // eslint-disable-next-line camelcase
      form.value.id_country = selectedCountry.value;
    });
    watch(selectedCountry, (newVal) => form.value.country = countriesList.value.find(el => el.id === newVal).name);
    const toggleAddNewAddress = () => {
      context.emit('toggle');
    };
    const handleFormSubmit = async () => {
      if (props.edit) {
        await updateAddress({ address: form.value });
      } else {
        await addAddress({ address: form.value });
      }
      toggleAddNewAddress();
    };
    const countriesLoading = async () => {
      await loadCountries();
      // eslint-disable-next-line camelcase
      if (props.addressForEdit.id_country) {
        selectedCountry.value = props.addressForEdit.id_country;
      }
    };
    countriesLoading();
    return {
      loading,
      loadingCountries,
      isFormSubmitted,
      form,
      countriesList,
      selectedCountry,
      statesList,
      handleFormSubmit,
      isStatesRequired,
      removeAddress,
      toggleAddNewAddress
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
