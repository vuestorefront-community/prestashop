# Getting Started

## Requirements
- PrestaShop version 1.7.7.x and higher
- Node 14

## How to start if you want to try out the integration
1. First we need to expose our PrestaShop REST API endpoints. Download and install [PrestaShop REST API](https://www.binshops.com/prestashop-api) just like any other PrestaShop module.

2. Clone the PrestaShop integration repository:
```
git clone git@github.com:vuestorefront-community/prestashop.git
```

3. Install dependencies: 
```
yarn install
```

4. Change API url in this file: 

```js
module.exports = {
    integrations: {
        prestashop: {
            location: '@vue-storefront/prestashop-api/server',
            configuration: {
                api: {
                    url: 'Your Shop URL'
                }
            }
        }
    }
};
```
5. Build and Run the project:
```sh
yarn build

yarn dev
```
