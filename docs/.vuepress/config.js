const GTM_TAG = 'GTM-WMDC3CP';

module.exports = {
  title: 'Vue Storefront 2 for PrestaShop',
  base: '/',
  description: 'Documentation for the PrestaShop connector for Vue Storefront 2',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],

    // Google Tag Manager
    ['script', {}, [`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_TAG}');
    `]],
  ],
  configureWebpack: (config) => {
    config.module.rules = config.module.rules.map(rule => ({
      ...rule,
      use: rule.use && rule.use.map(useRule => ({
        ...useRule,
        options: useRule.loader === 'url-loader' ?
            /**
             Hack for loading images properly.
             ref: https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
             */
            {  ...useRule.options, esModule: false } :
            useRule.options
      }))
    }))
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    [
      '@vuepress/plugin-medium-zoom',
      {
        // This selector excludes images from the "Integrations" page
        selector: 'main :not(.tile-image) > img'
      }
    ],
    '@vuepress/active-header-links',
    '@vuepress/search'
  ],
  themeConfig: {
    GTM_TAG,
    repo: 'https://github.com/vuestorefront-community/prestashop',
    editLinks: false,
    docsDir: 'docs',
    docsBranch: 'develop',
    nav: [
      { text: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      { text: 'Core Doc', link: 'https://docs.vuestorefront.io/v2/' },
      { text: 'PrestaShop REST API', link: 'https://www.binshops.com/prestashop-api' },
    ],
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        children: [
          ['/', 'Introduction'],
          ['/guide/getting-started', 'Getting started'],
          ['/guide/internationalization', 'Internationalization'],
          ['/guide/payment-options', 'Payment Basics'],
          ['/guide/supported-features', 'Supported Features'],
          ['/guide/about', 'About'],
        ]
      },
      {
        title: 'Composables',
        collapsable: true,
        children: [
          ['/guide/composables/useBootstrap', 'useBootstrap'],
          ['/guide/composables/useCart', 'useCart'],
          ['/guide/composables/useCountryList', 'useCountryList'],
          ['/guide/composables/useFacet', 'useFacet'],
          ['/guide/composables/useMakeOrder', 'useMakeOrder'],
          ['/guide/composables/usePayment', 'usePayment'],
          ['/guide/composables/useProduct', 'useProduct'],
          ['/guide/composables/useReview', 'useReview'],
          ['/guide/composables/useUser', 'useUser'],
          ['/guide/composables/useUserShipping', 'useUserShipping'],
        ]
      },
      {
        title: 'Releases',
        collapsable: true,
        children: [
          ['/guide/releases/v1.0.0', 'v1.0.0'],
          ['/guide/releases/v1.1.0', 'v1.1.0'],
          ['/guide/releases/v1.1.1', 'v1.1.1'],
          ['/guide/releases/v1.2.0', 'v1.2.0'],
        ]
      }
    ]
  }
}
