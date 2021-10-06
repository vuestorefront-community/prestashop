// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const parsePsCookie = (str) =>
  str
    .split(';')
    .slice(0, 1)
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc.vsfPsKeyCookie = decodeURIComponent(v[0] ? v[0].trim() : '');
      acc.vsfPsValCookie = decodeURIComponent(v[1] ? v[1].trim() : '');
      return acc;
    }, {});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const cookieParser = (headers) => {
  // to get the latest Auth cookie - normally there are two PrestaShop cookies
  if (headers['set-cookie']) {
    const numberOfCookies = headers['set-cookie'].length;
    let cookieString = null;
    for (let i = 0; i < numberOfCookies; i++) {
      // prestashop cookies start with PrestaShop
      if (headers['set-cookie'][i].includes('PrestaShop')) {
        cookieString = headers['set-cookie'][i];
      }
    }

    return parsePsCookie(cookieString);
  } else {
    return null;
  }
};

export {
  cookieParser
};
