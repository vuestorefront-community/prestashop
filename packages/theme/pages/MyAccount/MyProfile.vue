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
import {useRouter} from '@nuxtjs/composition-api';
import {useUiNotification, useUiState} from '~/composables';

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
    const router = useRouter();
    const { send: sendNotification } = useUiNotification();
    const { user, load, updateUser, changePassword, error: userError } = useUser();

    let emailAddress;
    // only run client side
    if (process.client) {
      Promise.resolve(load());
      console.log('myprofile setup user.value: ' + JSON.stringify(user.value));
      if (user.value) emailAddress = userGetters.getEmailAddress(user.value);
      else {
        // TODO: handle the scenario when reloading
        // router.push(context.root.localePath('/'));
        // sendNotification({
        //   key: 'user_load_error',
        //   message: 'User load has failed!',
        //   type: 'danger',
        //   title: 'Error',
        //   icon: 'danger'
        // });
        // return;
      }
    }

    //   const formHandler = async <T extends () => Promise<unknown>>(
    //     onSubmit: T,
    //     onComplete: OnFormComplete,
    //     onError: OnFormError,
    // )

    const formHandler = async (onSubmit, onComplete, onError) => {
      try {
        console.log('formHandler start');
        await onSubmit();
        console.log('formHandler user: ' + JSON.stringify(user.value));
        if (userError.value.updateUser) throw { message: userError.value.updateUser?.message };
        if (userError.value.changePassword) throw { message: userError.value.changePassword?.message };
        onComplete(user.value);

      } catch (error) {
        console.log(error);
        onError(error);
      }
    };

    // const updatePersonalData = ({ form, onComplete, onError }) => formHandler(async () => {
    //   // const data = await updateUser({ user: form.value });
    //   // console.log('updatePersonalData data: ' + JSON.stringify(data));
    //   // return data;
    //   const data = await updateUser({ user: form.value });
    //   console.log('updatePersonalData data: ' + JSON.stringify(data));
    //   console.log('updatePersonalData user: ' + JSON.stringify(user));
    //   return user;
    // }, onComplete, onError);
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
