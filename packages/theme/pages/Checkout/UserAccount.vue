<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <SfHeading
      v-e2e="'user-account-heading'"
      :level="3"
      :title="$t('Log in to your account or Create one')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div v-if="!isAuthenticated">
      <CheckoutAuthForm @submit="submitCheckoutAuthForm"/>
    </div>
    <div v-if="isAuthenticated">
      You are logged in. <SfLink @click="logOut" >Log out</SfLink>
    </div>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfLink
} from '@storefront-ui/vue';
import {reactive, ref} from '@nuxtjs/composition-api';
import { useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import {useShipping, useUser} from '@vue-storefront/prestashop';
import {required, min, email, confirmed} from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import CheckoutAuthForm from '~/components/Checkout/CheckoutAuthForm';

const COUNTRIES = [
  { key: 'US', label: 'United States' },
  { key: 'UK', label: 'United Kingdom' },
  { key: 'IT', label: 'Italy' },
  { key: 'PL', label: 'Poland' }
];

extend('email', {
  ...email,
  message: 'Invalid email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

extend('password', {
  validate: value => String(value).length >= 8,
  message: 'Password must have at least 8 characters'
});

extend('confirmed', {
  ...confirmed,
  message: 'Passwords don\'t match'
});

extend('nothavenumber', {
  validate: value => String(value).match(/^([^0-9]*)$/),
  message: 'Bad format - Cannot contain a number'
});

export default {
  name: 'Shipping',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfLink,
    ValidationProvider,
    ValidationObserver,
    CheckoutAuthForm,
    VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider')
  },
  setup (props, context) {
    const { $router } = context.root;
    const isFormSubmitted = ref(false);
    const { load, save, loading } = useShipping();
    const { toggleLoginModal } = useUiState();
    const { isAuthenticated, logout, register, login, error: userError } = useUser();

    const form = ref({
      firstName: '',
      lastName: '',
      streetName: '',
      apartment: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      phone: null
    });

    const handleFormSubmit = async () => {
      await save({ shippingDetails: form.value });
      isFormSubmitted.value = true;
    };

    onSSR(async () => {
      await load();
    });

    const handleAccountClick = async () => {
      toggleLoginModal();
    };

    const logOut = async () => {
      await logout();
      $router.push(context.root.localePath({ name: 'home' }));
    };

    const errorObj = reactive({
      login: null,
      register: null
    });

    const formHandler = async (fn, onComplete, onError) => {
      try {
        const data = await fn();

        const hasUserErrors = userError.value.register || userError.value.login;
        if (hasUserErrors) {
          errorObj.login = userError.value.login?.message;
          errorObj.register = userError.value.register?.message;

          onError(errorObj);
        }
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    const submitCheckoutAuthForm = ({ form, onComplete, onError }) => formHandler(() => {
      switch (form.value.whichForm) {
        case 'register':
          return register({ user: form.value });
        case 'login':
          form.value.username = form.value.email;
          return login({ user: form.value });
      }
    }, onComplete, onError);

    return {
      isAuthenticated,
      logOut,
      handleAccountClick,
      loading,
      isFormSubmitted,
      form,
      countries: COUNTRIES,
      handleFormSubmit,
      submitCheckoutAuthForm
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

.mb-20{
  margin-bottom: 20px;
}
</style>
