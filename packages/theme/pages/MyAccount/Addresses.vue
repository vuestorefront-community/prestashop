<template>
  <AddressScreen>
    <template #heading>
      <SfHeading
        v-e2e="'addresses-heading'"
        :level="3"
        :title="$t('Addresses')"
        class="sf-heading--left sf-heading--no-underline title"/>
    </template>
    <template #custom-action>
      <div/>
    </template>
  </AddressScreen>
</template>

<script>
import {SfHeading} from '@storefront-ui/vue';

export default {
  name: 'Shipping',
  components: {
    SfHeading,
    AddressScreen: () => import('../../components/AddressScreen.vue')
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
</style>
