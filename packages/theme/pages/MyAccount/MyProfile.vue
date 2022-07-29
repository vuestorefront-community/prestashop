<template>
  <SfTabs :open-tab="1">
    <!-- Personal data update -->
    <SfTab title="Personal data">
      <p class="message">
        {{ $t('Feel free to edit') }}
      </p>
        <ProfileUpdateForm @submit="updatePersonalData"/>
<!--      <p class="notice">-->
<!--        {{ $t('Use your personal data') }}-->
<!--        <a href="">{{ $t('Privacy Policy') }}</a>-->
<!--      </p>-->
    </SfTab>

    <!-- Password reset -->
    <SfTab title="Password change">
      <p class="message">
        {{ $t('Change password your account') }}:<br/>
        {{ $t('Your current email address is') }}
        <span class="message__label">{{ emailAddress }}</span>
      </p>
      <PasswordResetForm @submit="updatePassword"/>
    </SfTab>
  </SfTabs>
</template>

<script>
import { extend } from 'vee-validate';
import { email, required, min, confirmed } from 'vee-validate/dist/rules';
import ProfileUpdateForm from '~/components/MyAccount/ProfileUpdateForm';
import PasswordResetForm from '~/components/MyAccount/PasswordResetForm';
import { SfTabs, SfInput, SfButton } from '@storefront-ui/vue';
import { useUser, userGetters } from '@vue-storefront/prestashop';
import {computed, useRouter} from '@nuxtjs/composition-api';
import {useUiNotification, useUiState} from '~/composables';
import {Logger} from '@vue-storefront/core';

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

  setup(props, context) {
    // const uiState = useUiState();
    const { send: sendNotification } = useUiNotification();
    const { user, load, updateUser, changePassword, error: userError } = useUser();

    const emailAddress = computed(() => user.value ? userGetters.getEmailAddress(user.value) : '');

    //   const formHandler = async <T extends () => Promise<unknown>>(
    //     onSubmit: T,
    //     onComplete: OnFormComplete,
    //     onError: OnFormError,
    // )

    const formHandler = async (onSubmit, onComplete, onError) => {
      try {
        await onSubmit();

        if (userError.value.updateUser) throw { message: userError.value.updateUser?.message };
        if (userError.value.changePassword) throw { message: userError.value.changePassword?.message };
        onComplete(user.value);

      } catch (error) {
        Logger.error(error);
        onError(error);
      }
    };

    const updatePersonalData = ({ form, onComplete, onError }) => formHandler(() => updateUser({ user: form.value }), onComplete, onError);
    const updatePassword = ({ form, onComplete, onError }) => formHandler(() => changePassword({current: form.value.currentPassword, new: form.value.newPassword, customQuery: form.value.currentUser}), onComplete, onError);

    return {
      updatePersonalData,
      updatePassword,
      emailAddress
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
