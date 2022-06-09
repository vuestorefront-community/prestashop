module.exports = {
  integrations: {
    prestashop: {
      location: '@vue-storefront/prestashop-api/server',
      configuration: {
        api: {
          // url: 'https://rest.binshops.com',
          // restPath: '/rest'
          url: 'http://localhost:8080',
          restPath: '/rest/s1/pop'
        }
      }
    }
  }
};
