<template>
  <div>
    <LazyHydrate when-visible>
      <TopBar class="desktop-only" />
    </LazyHydrate>

    <AppHeader />

    <div id="layout">
      <nuxt :key="$route.fullPath"/>

      <BottomNavigation />
      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
      <Notification />
    </div>
    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import AppFooter from '~/components/AppFooter.vue';
import TopBar from '~/components/TopBar.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import WishlistSidebar from '~/components/WishlistSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import Notification from '~/components/Notification';
// import { onSSR } from '@vue-storefront/core';
import {useContext, useRoute} from '@nuxtjs/composition-api';
// import { useCart, useStore, useUser, useWishlist, useBootstrap } from '@vue-storefront/prestashop';
import { useCart, useStore, useUser, useBootstrap } from '@vue-storefront/prestashop';
import {Logger, useVSFContext} from '@vue-storefront/core';

export default {
  name: 'DefaultLayout',

  components: {
    LazyHydrate,
    TopBar,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification
  },

  // eslint-disable-next-line func-names
  setup() {
    const route = useRoute();
    const { $cookies } = useContext();
    const {boot: boot} = useBootstrap();
    const { load: loadStores } = useStore();
    const { isAuthenticated, load: loadUser } = useUser();
    const { load: loadCart } = useCart();
    // const { load: loadWishlist } = useWishlist();

    // only run client side
    if (process.client) {
      // make sure to get a cookie and csrf token before doing the rest of the calls
      boot()
        .then(() => {
          let promiseList = [
            loadStores(),
            loadCart()
            // loadWishlist()
          ];
          // Logger.error('default setup isAuthenticated.value: ' + JSON.stringify(isAuthenticated.value) + ' $cookies.get(\'moquiSessionToken\'): ' + JSON.stringify($cookies.get('moquiSessionToken')));
          if (isAuthenticated.value || $cookies.get('moquiSessionToken')) promiseList.push(loadUser());
          Promise.all(promiseList);
        });
    }

    return {
      // eslint-disable-next-line line-comment-position
      route
    };
  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}

// Reset CSS
html {
  width: auto;
  @include for-mobile {
    overflow-x: hidden;
  }
}
body {
  overflow-x: hidden;
  color: var(--c-text);
  font-size: var(--font-size--base);
  font-family: var(--font-family--primary);
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: var(--c-link);
  &:hover {
    color: var(--c-link-hover);
  }
}
h1 {
  font-family: var(--font-family--secondary);
  font-size: var(--h1-font-size);
  line-height: 1.6;
  margin: 0;
}
h2 {
  font-family: var(--font-family--secondary);
  font-size: var(--h2-font-size);
  line-height: 1.6;
  margin: 0;
}
h3 {
  font-family: var(--font-family--secondary);
  font-size: var(--h3-font-size);
  line-height: 1.6;
  margin: 0;
}
h4 {
  font-family: var(--font-family--secondary);
  font-size: var(--h4-font-size);
  line-height: 1.6;
  margin: 0;
}
</style>
