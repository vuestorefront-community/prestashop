<template>
  <SfTopBar class="topbar">
    <template #left>
      <SfButton class="sf-button--text">{{ $t('Help & FAQs') }}</SfButton>
    </template>
    <template #center>
      <p>{{ $t('Download') }}</p>
      <SfButton class="topbar__button sf-button--text">{{ $t('Find out more') }}</SfButton>
    </template>
    <template #right v-if='isMultiLang'>
      <LocaleSelector />
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';
import LocaleSelector from './LocaleSelector';
import { computed } from '@nuxtjs/composition-api';

export default {
  components: {
    SfTopBar,
    SfButton,
    LocaleSelector
  },
  setup(props, context) {
    return {
      isMultiLang: computed(() => context.root.$i18n.locales ? context.root.$i18n.locales.length > 1 : false)
    };
  }
};

</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  z-index: 2;
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}
</style>
