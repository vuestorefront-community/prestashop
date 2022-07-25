<template>
  <ValidationObserver v-slot="{ handleSubmit, reset }" key="profile-update">
    <form
      class="form"
      @submit.prevent="handleSubmit(submitForm(reset))"
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
            label="First Name"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:2|nothavenumber"
          class="form__element">
          <SfInput
            v-model="form.lastName"
            name="lastName"
            label="Last Name"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"/>
        </ValidationProvider>
      </div>
      <div class="form__horizontal">
<!--        <ValidationProvider-->
<!--          v-slot="{ errors }"-->
<!--          rules="required"-->
<!--          class="form__element">-->
<!--          <SfSelect-->
<!--            v-model="form.gender"-->
<!--            label="gender"-->
<!--            required>-->
<!--            <SfSelectOption v-for="option of genderOptions" :key="option.value" :value="option.value">-->
<!--              {{option.label}}-->
<!--            </SfSelectOption>-->
<!--          </SfSelect>-->
<!--        </ValidationProvider>-->
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|email"
          class="form__element">
          <SfInput
            v-model="form.email"
            type="email"
            name="email"
            label="Your e-mail"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            :disabled="true"
          />
        </ValidationProvider>
      </div>
      <div class="form__horizontal">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:8"
          class="form__element">
        <SfInput
          v-model="currentPassword"
          type="password"
          name="currentPassword"
          label="Current Password"
          required
          class="form__element"
        />
        </ValidationProvider>
      </div>
      <SfButton
        type="submit"
        class="form__button"
        :disabled="loading">
        <SfLoader :class="{ loader: loading }" :loading="loading">
          <div>{{ $t('Update personal data') }}</div>
        </SfLoader>
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { useUser, userGetters } from '@vue-storefront/prestashop';
import {
  SfInput,
  SfButton,
  SfModal,
  SfSelect,
  SfProductOption,
  SfLoader
} from '@storefront-ui/vue';
import { useUiNotification } from '~/composables';
export default defineComponent({
  name: 'ProfileUpdateForm',
  components: {
    SfInput,
    SfButton,
    SfModal,
    SfSelect,
    SfProductOption,
    SfLoader,
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
  setup(props, { emit }) {
    // const { app: { i18n } } = useContext();
    const { user, updateUser } = useUser();
    const currentPassword = ref('');
    const genderOptions = [
      { value: 1, label: 'male' },
      { value: 2, label: 'female' }
    ];
    const getInitialForm = () => ({
      firstName: userGetters.getFirstName(user.value),
      lastName: userGetters.getLastName(user.value),
      email: userGetters.getEmailAddress(user.value),
      gender: userGetters.getGender(user.value)
    });
    const { send: sendNotification } = useUiNotification();
    let form;
    if (process.client) {
      form = ref(getInitialForm());
    }

    // const handleForm = (fn) => async () => {
    //   await fn({ user: form.value });
    // };

    const submitForm = (resetValidationFn) => () => {
      const onComplete = (data) => {
        form.value = getInitialForm();
        console.log('submitForm data: ' + JSON.stringify(data));
        currentPassword.value = '';
        sendNotification({
          id: Symbol('user_updated'),
          message: data.message ? data.message : 'The user account data was successfully updated!',
          type: 'success',
          icon: 'check',
          persist: false,
          title: 'User Account'
        });
        resetValidationFn();
      };
      const onError = (error) => {
        sendNotification({
          id: Symbol('user_updated'),
          message: error.message,
          type: 'danger',
          icon: 'cross',
          persist: false,
          title: 'User Account'
        });
      };
      // const isEmailChanged = userGetters.getEmailAddress(user.value) !== form.value.email;
      // if (isEmailChanged && !requirePassword.value) {
      //   requirePassword.value = true;
      // } else {
      if (currentPassword.value) {
        form.value.password = currentPassword.value;
      }
      // const eventPayload : SubmitEventPayload<ProfileUpdateFormFields> = ;
      emit('submit', { form, onComplete, onError });
      // }
    };

    return {
      currentPassword,
      form,
      submitForm,
      // handleUpdate,
      genderOptions
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
