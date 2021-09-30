/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line func-names
export default (context) => {
  const psName = context.$config.psCustomerCookieKey;
  const cookieName = context.$cookies.get(psName);

  const psValue = context.$config.psCustomerCookieValue;
  const cookieValue = context.$cookies.get(psValue);

  // check if user not logged In
  if (!cookieName && !cookieValue) {
    context.app.router.push('/');
    context.redirect('/');
  }
};
