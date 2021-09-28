// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const cookieParser = (str) =>
  str
    .split(';')
    .slice(0, 1)
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc.vsfPsKeyCookie = decodeURIComponent(v[0] ? v[0].trim() : '');
      acc.vsfPsValCookie = decodeURIComponent(v[1] ? v[1].trim() : '');
      return acc;
    }, {});

export {
  cookieParser
};
