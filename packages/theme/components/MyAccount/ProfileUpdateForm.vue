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
    const form = ref(getInitialForm());

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
          message: 'The user account data was successfully updated!',
          type: 'success',
          icon: 'check',
          persist: false,
          title: 'User Account'
        });
        resetValidationFn();
      };
      const onError = (message) => {
        sendNotification({
          id: Symbol('user_updated'),
          message: message,
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

    // const submitForm = (resetValidationFn) => {
    //   // try {
    //   //   console.log('submitForm form.value ' + JSON.stringify(form.value));
    //   //   const data = await updateUser({user: form.value});
    //   //   console.log('submitForm data ' + JSON.stringify(data));
    //   //
    //   // } catch (error) {
    //   //   console.log(error);
    //   // }
    //
    //   // const onComplete = (data) => {
    //   //   // form.value = getInitialForm();
    //   //   currentPassword.value = '';
    //   //   console.log('onComplete submitForm: data ' + JSON.stringify(data));
    //   //   sendNotification({
    //   //     id: Symbol('user_updated'),
    //   //     message: 'The user account data was successfully updated!',
    //   //     type: 'success',
    //   //     icon: 'check',
    //   //     persist: false,
    //   //     title: 'User Account Update'
    //   //   });
    //   //   resetValidationFn();
    //   // };
    //   // const onError = (error) => {
    //   //   console.log('onError submitForm: error ' + JSON.stringify(error));
    //   //   sendNotification({
    //   //     id: Symbol('user_update_failed'),
    //   //     message: 'Could not update user! Check password or lastname, firstname format.',
    //   //     type: 'danger',
    //   //     icon: 'error',
    //   //     persist: false,
    //   //     title: 'User Account Update'
    //   //   });
    //   // };
    //   if (currentPassword.value) {
    //     form.value.password = currentPassword.value;
    //   }
    //   // emit('submit', { form, onComplete, onError });
    //
    //
    //   try {
    //
    //
    //     // const data = Promise.resolve(() => {
    //     //   return new Promise((resolve, reject) => {
    //     //     console.log('formHandler form.value ' + JSON.stringify(form.value));
    //     //     let updatedUser;
    //     //
    //     //     updateUser({user: form.value})
    //     //       .then((_updatedUser) => console.log('formHandler await updateUser({user: form.value}) ' + JSON.stringify(_updatedUser)));
    //     //
    //     //     resolve(updatedUser);
    //     //   });
    //     // }).then((_data) => console.log('formHandler data ' + JSON.stringify(_data)));
    //
    //     const tick = Date.now();
    //     const log = (v) => console.log(`${v} \n Elapsed ${Date.now() - tick}`);
    //
    //     const codeBlocker = () => {
    //       // let i = 0;
    //       // while (i < 1000000000) i++;
    //       // return ('Billion loops done');
    //
    //       return new Promise((resolve, reject) => {
    //         let i = 0;
    //         while (i < 1000000000) i++;
    //         resolve(i);
    //       });
    //
    //       // return Promise.resolve().then(() => {
    //       //   let i = 0;
    //       //   while (i < 1000000000) i++;
    //       //   return ('Billion loops done');
    //       // });
    //     };
    //
    //     log(' ');
    //     log(' ');
    //     log(' ');
    //     log(' ');
    //     log(' ');
    //     log(' ');
    //     log(' ');
    //     log(' ');
    //     log(' ');
    //     log(' ');
    //     log(' ');
    //     log(' ');
    //     log(' ');
    //     log(' ');
    //     log('Sync 1');
    //
    //     // log(codeBlocker());
    //     let a;
    //     updateUser({user: form.value})
    //       .then(data => {
    //         // a = v;
    //         console.log('data: ' + JSON.stringify(data));
    //         // log(a);
    //         log('Sync 2');
    //       })
    //     ;
    //     // let a;
    //     // codeBlocker()
    //     //   .then(v => {
    //     //     // a = v;
    //     //     log(v);
    //     //     // log(a);
    //     //     return new Promise((resolve, reject) => {
    //     //       let i = 0;
    //     //       while (i < 1000000000) i++;
    //     //       resolve('Billion loops done 2');
    //     //     });
    //     //   })
    //     //   .then(log('Sync 2'));
    //     // codeBlocker().then((v) => log(v));
    //
    //     // log('Sync 2');
    //
    //     // Promise.resolve(onComplete(data));
    //   } catch (error) {
    //     console.log(error);
    //     // onError(error);
    //   }
    // };
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
