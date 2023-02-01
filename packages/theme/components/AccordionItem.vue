<template>
  <div class="sf-accordion-item">
      <SfButton
        @click="toggleAccordion(hasItems)"
        class="sf-button--pure sf-accordion-item__header"
        :aria-expanded="isOpen"
      >
        <slot name="title" />
        <SfChevron
          v-if="hasItems"
          tabindex="0"
          class="sf-accordion-item__chevron"
          :class="{ 'sf-chevron--right': !isOpen }"
        />
      </SfButton>
    <div :class="{ 'display-none': !isOpen }">
      <div class="sf-accordion-item__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { SfChevron, SfButton } from '@storefront-ui/vue';

export default {
  name: 'AccordionItem',
  components: {
    SfChevron,
    SfButton
  },
  props: {
    hasItems: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleAccordion(hasItems) {
      if (hasItems) {
        this.$parent.$emit('toggle', this._uid);
      }
    }
  }
};
</script>
