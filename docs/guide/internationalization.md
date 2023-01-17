# Internationalization
Internationalization support added in version 1.1.0. The PrestaShop integration supports single language by default. However, to support multi-language we need to do some configurations. 

## How to enable multi-lang support?
To get multi-language support working properly, we need to enable the desired languages on both PrestaShop BO and VSF integration (within nuxt configuration). To enable your desired languages in front side, first locate the `packages/theme/nuxt.config.js` file and then try to add your language in `i18n.locales` section.

## Multi-currency
Once you have added languages, you can bind each language to a currency. You can do this in the nuxt configurations through `numberFormats`. Locate the `packages/theme/nuxt.config.js` file and try to add language currency settings in `numberFormats`. This way, when user tries to change language the currency will be changed based on these settings. If you see this is a limitation, you can disable it and customize it yourself. To do it, set `autoChangeCookie.currency` to `false` .

For more info about Vue Storefront localization you can take a look at [this link](https://docs.vuestorefront.io/v2/getting-started/internationalization.html#currency-detection). 

## List of supported languages
- English (default)
- German
- French
- Italian
- Spanish
- Portuguese

## Contribute to add a new language
Language files are located at `packages/theme/lang` directory, you can make a copy of `en.js` and then rename it and then try to translate the value part of the translation file.
