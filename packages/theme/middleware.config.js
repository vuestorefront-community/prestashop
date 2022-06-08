module.exports = {
  integrations: {
    prestashop: {
      location: '@vue-storefront/prestashop-api/server',
      configuration: {
        api: {
          url: 'https://rest.binshops.com'
          // url: 'http://localhost:8080/rest/s1/pop'
        }
      }
    }
  }
};
