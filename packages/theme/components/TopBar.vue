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
import { useBootstrap } from '@vue-storefront/prestashop';
import { computed } from '@nuxtjs/composition-api';

export default {
  components: {
    SfTopBar,
    SfButton,
    LocaleSelector
  },
  setup(props, context) {
    const {
      languages: languages
    } = useBootstrap();

    languages.value.forEach(el => {
      if (!context.root.$i18n.locales.find(el2 => el2.iso === el.iso_code)) {
        context.root.$i18n.locales.push({ code: el.iso_code, label: el.name_simple, file: `${el.iso_code}.js`, iso: el.iso_code });
        context.root.$i18n.localeCodes.push(el.iso_code);
      }
    });
    return {
      isMultiLang: computed(() => context.root.$i18n.locales ? context.root.$i18n.locales.lenght > 1 : false)
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
