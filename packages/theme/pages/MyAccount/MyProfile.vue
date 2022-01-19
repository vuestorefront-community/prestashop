<template>
  <SfTabs :open-tab="1">
    <!-- Personal data update -->
    <SfTab title="Personal data">
      <p class="message">
        {{ $t('Feel free to edit') }}
      </p>

      <ProfileUpdateForm @submit="updatePersonalData" />

      <p class="notice">
        {{ $t('Use your personal data') }}
        <a href="">{{ $t('Privacy Policy') }}</a>
      </p>
    </SfTab>

    <!-- Password reset -->
    <SfTab title="Password change">
      <p class="message">
        {{ $t('Change password your account') }}:<br />
        {{ $t('Your current email address is') }}
        <span class="message__label">example@email.com</span>
      </p>

      <PasswordResetForm @submit="updatePassword" />
    </SfTab>
  </SfTabs>
</template>

<script>
import { extend } from 'vee-validate';
import { email, required, min, confirmed } from 'vee-validate/dist/rules';
import ProfileUpdateForm from '~/components/MyAccount/ProfileUpdateForm';
import PasswordResetForm from '~/components/MyAccount/PasswordResetForm';
import { SfTabs, SfInput, SfButton } from '@storefront-ui/vue';
import { useUser } from '@vue-storefront/prestashop';

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
  name: 'PersonalDetails',

  components: {
    SfTabs,
    SfInput,
    SfButton,
    ProfileUpdateForm,
    PasswordResetForm
  },

  setup() {
    const { updateUser, changePassword } = useUser();

    const formHandler = async (fn, onComplete, onError) => {
      try {
        const data = await fn();
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    const updatePersonalData = ({ form, onComplete, onError }) => formHandler(() => updateUser({ user: form.value }), onComplete, onError);
    const updatePassword = ({ form, onComplete, onError }) => formHandler(() => changePassword({ current: form.value.currentPassword, new: form.value.newPassword, customQuery: form.value.currentUser }), onComplete, onError);

    return {
      updatePersonalData,
      updatePassword
    };
  }
};
</script>

<style lang='scss' scoped>
.message,
.notice {
  font-family: var(--font-family--primary);
  line-height: 1.6;
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font-size: var(--font-size--base);
  &__label {
    font-weight: 400;
  }
}
.notice {
  margin: var(--spacer-lg) 0 0 0;
  font-size: var(--font-size--sm);
}

</style>
