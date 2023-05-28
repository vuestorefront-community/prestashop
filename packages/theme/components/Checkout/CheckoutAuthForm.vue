<template>
  <div>
    <SfTabs :open-tab="1">
      <SfTab title="Register">
        <ValidationObserver v-slot="{ handleSubmit, reset }">
          <form
            class="form"
            @submit.prevent="handleSubmit(submitForm(reset, 'register'))"
          >
            <div class="form__horizontal">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:2|nothavenumber"
                class="form__element"
              >
                <SfInput
                  v-model="form.firstName"
                  name="firstName"
                  :label="$t('First Name')"
                  required
                  :valid="!errors[0]"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:2|nothavenumber"
                class="form__element"
              >
                <SfInput
                  v-model="form.lastName"
                  name="lastName"
                  :label="$t('Last Name')"
                  required
                  :valid="!errors[0]"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="form__horizontal">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|email"
                class="form__element"
              >
                <SfInput
                  v-model="form.email"
                  type="email"
                  name="email"
                  :label="$t('Your email')"
                  required
                  :valid="!errors[0]"
                  :error-message="errors[0]"
                />
              </ValidationProvider>

            </div>
            <div class="form__horizontal">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:2"
                class="form__element"
              >
                <SfInput
                  v-model="password"
                  type="password"
                  name="password"
                  :label="$t('Password')"
                  required
                  class="form__element"
                />
              </ValidationProvider>
            </div>
            <SfButton
              :disabled="formSubmit"
              class="form__button"
            >
              {{ $t('Submit') }}
            </SfButton>
          </form>
        </ValidationObserver>
      </SfTab>
      <SfTab title="Login">
        <ValidationObserver v-slot="{ handleSubmit, reset }">
          <form
            class="form"
            @submit.prevent="handleSubmit(submitForm(reset, 'login'))"
          >
            <div class="form__horizontal">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|email"
                class="form__element"
              >
                <SfInput
                  v-model="form.email"
                  type="email"
                  name="email"
                  :label="$t('Your email')"
                  required
                  :valid="!errors[0]"
                  :error-message="errors[0]"
                />
              </ValidationProvider>

            </div>
            <div class="form__horizontal">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:2"
                class="form__element"
              >
                <SfInput
                  v-model="password"
                  type="password"
                  name="password"
                  :label="$t('Password')"
                  required
                  class="form__element"
                />
              </ValidationProvider>
            </div>
            <SfButton
              class="form__button"
            >
              {{ $t('Login') }}
            </SfButton>
          </form>
        </ValidationObserver>
      </SfTab>
    </SfTabs>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import {
  SfInput,
  SfButton,
  SfModal,
  SfSelect,
  SfProductOption,
  SfTabs
} from '@storefront-ui/vue';
import { useUiNotification } from '~/composables';
export default defineComponent({
  name: 'CheckoutAuthForm',
  components: {
    SfTabs,
    SfInput,
    SfButton,
    SfModal,
    SfSelect,
    SfProductOption,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['submit'],
  setup(props, context) {
    const emit = context.emit;
    const { $router } = context.root;
    const password = ref('');
    const formSubmit = ref(false);
    const genderOptions = [
      { value: 1, label: 'male' },
      { value: 2, label: 'female' }
    ];
    const resetForm = () => ({
      firstName: '',
      lastName: '',
      email: '',
      gender: ''
    });
    const {
      send: sendNotification
    } = useUiNotification();
    const form = ref(resetForm());
    const submitForm = (resetValidationFn, whichForm) => () => {
      const onComplete = () => {
        formSubmit.value = false;
        form.value = resetForm();
        password.value = '';
        $router.push(context.root.localePath({ name: 'shipping' }));
        resetValidationFn();
      };
      const onError = () => {
        formSubmit.value = false;

        sendNotification({
          id: Symbol('user_create_failed'),
          message: 'Could not create user! Check password or lastname, firstname format.',
          type: 'danger',
          icon: 'error',
          persist: false,
          title: 'User Account Create'
        });
      };
      if (password.value) {
        form.value.password = password.value;
      }
      form.value.whichForm = whichForm;
      formSubmit.value = true;

      emit('submit', { form, onComplete, onError });
    };
    return {
      password,
      form,
      submitForm,
      genderOptions,
      formSubmit
    };
  }
});
</script>
<style lang='scss' scoped>
.form {
  &__element {
    display: block;
    margin: 0 0 var(--spacer-lg) 0;
  }
  &__button {
    display: block;
    width: 100%;
    @include for-desktop {
      width: 17.5rem;
    }
  }
  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-2xl);
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
