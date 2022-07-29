<template>

  <SfModal v-e2e="'add-review-modal'"
    :visible="isAddReviewModalOpen"
    class="modal"
    :cross="false">

    <!-- TODO: This should be a form with error handling -->
<!--    <SfInput-->
<!--      v-e2e="'add-review-modal'"-->
<!--      :label="$t('Title')"-->
<!--      v-model="title"-->
<!--      name="comment"-->
<!--      type="text"-->
<!--      class="form__element"-->
<!--    />-->
    <p style="margin-bottom:0px;">Comment</p>
    <SfTextarea v-model="comment" name="Comment" class="textarea" :rows="6" />

    <p style="margin-bottom:0px;">Rating</p>
<!--    TODO: style-->
    <SfSelect
      style="padding-top:0px;padding-bottom:0px"
      v-e2e="'Rating'"
      v-model="rate"
      name="Rate"
      class="sf-select--underlined product__select-size"
    >
      <SfSelectOption v-for="i in 5" :key="i" :value="i">{{ i }}</SfSelectOption>
    </SfSelect>
    <SfRating :max="5" :score="rate"/>
    <div class="btns">
      <SfButton class="sf-button--text" @click="closeModal">{{ $t('Back') }}</SfButton>
      <SfButton class="before-results__button" @click="addingReviewFunc">ADD REVIEW</SfButton>
    </div>
  </SfModal>
</template>
<script>
import {
  SfModal,
  SfButton,
  SfLoader,
  SfBar,
  SfInput,
  SfRating,
  SfTextarea,
  SfSelect
} from '@storefront-ui/vue';
import { ref } from '@nuxtjs/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { useReview } from '@vue-storefront/prestashop';
import useUiNotification from '~/composables/useUiNotification';
import {useUiState} from '~/composables';

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  layout: 'blank',
  components: {
    SfButton,
    SfModal,
    SfLoader,
    SfBar,
    SfInput,
    ValidationProvider,
    ValidationObserver,
    SfRating,
    SfTextarea,
    SfSelect
  },
  props: {
    productId: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    const form = ref({});
    const { send: sendNotification } = useUiNotification();
    const { isAddReviewModalOpen, toggleAddReviewModalOpen } = useUiState();

    const { reviews: productReviews, addReview, error: reviewError } = useReview();

    const closeModal = () => {
      toggleAddReviewModalOpen();
      // TODO: See what happens when removing the next line
      document.body.removeAttribute('style');
      context.emit('close');
    };

    // TODO: This should be refactored to be implementation independent and not require useReview
    const addingToReview = (comment) => {
      addReview(comment)
        .then(() => {
          // Logger.debug('AddReview productReviews: ' + JSON.stringify(productReviews));

          if (reviewError.value.addReview) throw {message: reviewError.value.addReview?.message};

          sendNotification({
            key: 'review_added',
            message: 'Review has been successfully added!',
            type: 'success',
            title: 'Comment added!',
            icon: 'check'
          });
          closeModal();
        })
        .catch((error) => {
          sendNotification({
            key: 'review_added_error',
            message: error.message ? error.message : 'Unable to add a review.',
            type: 'danger',
            title: 'add review error',
            icon: 'error'
          });
        });
    };

    return {
      form,
      addReview,
      productReviews,
      sendNotification,
      addingToReview,
      isAddReviewModalOpen,
      toggleAddReviewModalOpen,
      closeModal
    };
  },
  data() {
    return {
      close: true,
      comment: '',
      title: '',
      rate: '1'
    };
  },
  methods: {
    addingReviewFunc() {
      const comment = {
        // eslint-disable-next-line camelcase
        id_product: this.productId,
        // eslint-disable-next-line camelcase
        comment_content: this.comment,
        // eslint-disable-next-line camelcase
        comment_title: this.title,
        criterion: this.rate.toString()
      };
      this.addingToReview(comment);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  --modal-index: 3;
  --overlay-z-index: 3;
}
.form {
  margin-top: var(--spacer-sm);
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
  }
}
.action {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6
    var(--font-family--secondary);
  & > * {
    margin: 0 0 0 var(--spacer-xs);
  }
}
.action {
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
}
.checkbox {
  margin-bottom: var(--spacer-2xl);
}
.bottom {
  text-align: center;
  margin-bottom: var(--spacer-lg);
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight--semibold);
  font-family: var(--font-family--secondary);
  &__paragraph {
    color: var(--c-primary);
    margin: 0 0 var(--spacer-base) 0;
    @include for-desktop {
      margin: 0;
    }
  }
}

.btns {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}
.textare{
  width:100%

}
.textare textarea {
    width:92%
  }
</style>
