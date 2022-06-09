const parsePsCookie = (str) =>
  str
    ?.split(';')
    ?.slice(0, 1)
    ?.map(v => v.split('='))
    ?.reduce((acc, v) => {
      acc.vsfPsKeyCookie = decodeURIComponent(v[0] ? v[0].trim() : '');
      acc.vsfPsValCookie = decodeURIComponent(v[1] ? v[1].trim() : '');
      return acc;
    }, {});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const cookieParser = (headers) => {
  // to get the latest Auth cookie - normally there are two PrestaShop cookies
  const cookieArray = headers['set-cookie'] ? headers['set-cookie'] : [];

  // TODO: Allow for multiple cookies rather than just the first
  return parsePsCookie(cookieArray?.at(0)) || '';
};

export {
  cookieParser
};
