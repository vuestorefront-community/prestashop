<template>
  <div class="sf-header__navigation desktop" v-if="!isMobile">
    <SfHeaderNavigationItem
      v-for="(category, index) in categories"
      :key="index"
      class="nav-item"
      v-e2e="`app-header-url_${category.slug}`"
      :label="category.label"
      :link="localePath(`/c/${category.slug}`)"
      @mouseover='mouseOver(category)'
      @mouseleave='mouseLeave(category)'
    >
      <SfMegaMenu
        :visible="menuMouseStatus[category.label]"
        class="menu"
        isAbsolute
      >
        <transition name="sf-fade" mode="out-in">
          <div v-if="category.children && category.children.length > 0" class="menu__wrapper-items" key="items">
            <SfMegaMenuColumn :title="$t('Product suggestions')" class="sf-mega-menu-column--pined-content-on-mobile menu__items">
              <template #title="{title}">
                <SfScrollable class="items--desktop desktop-only" show-text="" hide-text="">
                  <div class="items-listing container">
                    <div v-for="(firstChildren, index) in category.children"
                         :key="index"
                    >
                    <SfMenuItem
                      :label="firstChildren.label"
                      :link="localePath(`/c/${category.slug}/${firstChildren.slug}`)"
                    />
                      <div v-if='firstChildren.children && firstChildren.children.length > 0' class="items-listing">
                        <div v-for="(secondChildren, secondIndex) in firstChildren.children"
                             :key="secondIndex"
                        >
                        <SfMenuItem
                          :label="secondChildren.label"
                          :link="localePath(`/c/${category.slug}/${firstChildren.slug}/${secondChildren.slug}`)"
                        />
                          <div v-if='secondChildren.children && secondChildren.children.length > 0' class="items-listing">
                            <SfMenuItem
                              v-for="(thirdChildren, thirdIndex) in secondChildren.children"
                              :key="thirdIndex"
                              :label="thirdChildren.label"
                              :link="localePath(`/c/${category.slug}/${firstChildren.slug}/${secondChildren.slug}/${thirdChildren.slug}`)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SfScrollable>
              </template>
            </SfMegaMenuColumn>
            <div class="action-buttons smartphone-only">
              <SfButton class="action-buttons__button color-light" @click="$emit('close')">{{ $t('Cancel') }}</SfButton>
            </div>
          </div>
        </transition>
      </SfMegaMenu>
    </SfHeaderNavigationItem>
  </div>
  <SfModal v-else :visible="isMobileMenuOpen">
    <SfAccordion
      v-e2e="'categories-accordion'"
      :show-chevron="true"
      multiple
    >
      <AccordionItem
        v-for="(cat, i) in categories"
        :key="i"
        :hasItems="Boolean(cat.children.length)"
      >
        <template #title>
          <nuxt-link
            :to="localePath(`/c/${cat.slug}`)"
            @click.native="toggleMobileMenu"
          >
            {{ cat.label }}
          </nuxt-link>
        </template>

        <template #default>
          <SfAccordion v-e2e="'subcategories-accordion'" :show-chevron="true" multiple>
            <AccordionItem
              class="inner-accordion"
              v-for="(subCat, i) in cat.children"
              :key="i"
              :hasItems="Boolean(subCat.children.length)"
            >
              <template #title>
                <nuxt-link
                  :to="localePath(`/c/${subCat.slug}`)"
                  @click.native="toggleMobileMenu"
                >
                  {{ subCat.label }}
                </nuxt-link>
              </template>
              <template #default>
                <SfList class="list">
                  <SfListItem
                    class="list__item"
                    v-for="(subsubCat, j) in subCat.children"
                    :key="j"
                  >
                    <nuxt-link
                      :to="localePath(`/c/${subsubCat.slug}`)"
                      :class="
                        subsubCat.isCurrent ? 'sidebar--cat-selected' : ''
                      "
                      @click.native="toggleMobileMenu"
                    >
                      {{ subsubCat.label }}
                    </nuxt-link>
                  </SfListItem>
                </SfList>
              </template>
            </AccordionItem>
          </SfAccordion>
        </template>
      </AccordionItem>
    </SfAccordion>
  </SfModal>
</template>

<script>
import { SfMenuItem, SfModal, SfMegaMenu, SfAccordion, SfList, SfScrollable, SfButton } from '@storefront-ui/vue';

import { useUiState } from '~/composables';
import {
  useBootstrap
} from '@vue-storefront/prestashop';
import { computed } from '@nuxtjs/composition-api';
import { addBasePath } from '@vue-storefront/core';
import AccordionItem from '~/components/AccordionItem';

export default {
  name: 'HeaderNavigation',
  components: {
    SfList,
    SfMenuItem,
    SfModal,
    SfMegaMenu,
    SfAccordion,
    AccordionItem,
    SfScrollable,
    SfButton
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false
    },
    result: {
      type: Array
    }
  },
  setup(props) {
    const products = computed(() => props.result);
    const {
      menuItems: categories,
      menuMouseStatus
    } = useBootstrap();

    const { isMobileMenuOpen, toggleMobileMenu } = useUiState();

    const mouseOver = (category) => {
      if (category.children.length > 0) {
        // context.root.$emit('hoverItem', category);
        menuMouseStatus.value[category.label] = true;
      }
    };
    const mouseLeave = (category) => {
      menuMouseStatus.value[category.label] = false;
    };

    return {
      categories,
      isMobileMenuOpen,
      toggleMobileMenu,
      mouseOver,
      mouseLeave,
      menuMouseStatus,
      products,
      addBasePath
    };
  }
};
</script>

<style>
.inner-accordion > button{
  border: none !important;
}
.inner-accordion > div > div {
  border-bottom: none !important;
}
</style>

<style lang="scss" scoped>
.sf-header-navigation-item {
  ::v-deep &__item--mobile {
    display: block;
  }
}
.sf-modal {
  ::v-deep &__bar {
    display: none;
  }
  ::v-deep &__content {
    padding: var(--modal-content-padding, var(--spacer-base) 0);
  }
}

.sf-menu-item{
  width: 100%;
}
.menu {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 3;
  --mega-menu-column-header-margin: var(--spacer-sm) 0 var(--spacer-xl);
  --mega-menu-content-padding: 0;
  --mega-menu-height: auto;
  @include for-desktop {
    --mega-menu-content-padding: var(--spacer-xl) 0;
  }
  &__wrapper-items {
    display: flex;
    flex-direction: column;
    @include for-desktop {
      flex-direction: row;
      flex: 1;
    }
  }
  &__categories {
    flex: 0 0 220px;
  }
  &__items {
    flex: 1
  }
  &__header {
    margin-left: var(--spacer-sm);
  }
  ::v-deep .sf-bar {
    display: none;
  }
  ::v-deep .sf-mega-menu-column__header {
    display: none;
    @include for-desktop {
      display: flex;
    }
  }
}
.items {
  &--desktop {
    --scrollable-max-height: 35vh;
  }
  &--mobile {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: var(--c-white);
    padding: var(--spacer-base) var(--spacer-sm);
    --product-card-max-width: 9rem ;
  }
}
.see-all {
  padding: var(--spacer-xl) 0 0 var(--spacer-sm);
}
.action-buttons {
  padding: var(--spacer-xl) var(--spacer-sm) var(--spacer-3xl);
  background: var(--c-white);
  width: 100%;
  &__button {
    width: calc(100% - 32px);
  }
}
.items-listing {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-left: var(--spacer-xl);
  &.container {
    margin-left: calc( var(--spacer-2xl) + 50px );
  }
}
.item-card {
  margin: var(--spacer-sm) 0;
  @include for-desktop {
    margin: var(--spacer-2xs) 0;
  }
}

.before-items {
  box-sizing: border-box;
  padding: var(--spacer-base) var(--spacer-sm) var(--spacer-2xl);
  width: 100%;
  text-align: center;
  @include for-desktop {
    padding: 0;
  }
  &__picture {
    --image-width: 230px;
    margin-top: var(--spacer-2xl);
    @include for-desktop {
      --image-width: 18.75rem;
      margin-top: var(--spacer-base);
    }
  }
  &__paragraph {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    margin: 0;
    @include for-desktop {
      font-size: var(--font-size--lg);
    }
    &:first-of-type {
      margin: var(--spacer-xl) auto var(--spacer-xs);
    }
  }
  &__button {
    margin: var(--spacer-xl) auto;
    width: 100%;
  }
}
.invisible {
  visibility: hidden !important;
}
</style>
