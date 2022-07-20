import {cookieParser} from '../../helpers/cookieParser';
import {logger} from '../../helpers/logging';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function bootstrap(context, params) {
  // logger.warn("params " + JSON.stringify(params));
  // logger.error("params " + JSON.stringify(params));

  // logger.warn('context.$prestashop.config.app.$cookies.get(\'moquiSessionToken\') ' + JSON.stringify(context.$prestashop.config.app.$cookies.get('moquiSessionToken')));
  // logger.error('context.$prestashop.config.app.$cookies.get(\'moquiSessionToken\') ' + JSON.stringify(context.$prestashop.config.app.$cookies.get('moquiSessionToken')));

  let response;
  let cookieObject;
  try {
    logger.warn(JSON.stringify(params.url) + ' context.client.defaults.headers ' + JSON.stringify(context.client.defaults.headers.common));
    response = await context.client(params)
    // .then((_response) => {
    //   logger.warn(JSON.stringify(params.url) + ' typeof _response ' + JSON.stringify(typeof _response));
    //   // logger.warn(JSON.stringify(params.url) + ' _response ' + JSON.stringify(_response));
    //   // response = _response;
    //   // return _response;
    // })
    // .catch((error) => {
    //   if (error.response) {
    //   // The request was made and the server responded with a status code
    //   // that falls out of the range of 2xx
    //     logger.error(JSON.stringify(params.url) + ' error.response.data ' + JSON.stringify(error.response.data));
    //     logger.error(JSON.stringify(params.url) + ' error.response.status ' + JSON.stringify(error.response.status));
    //     logger.error(JSON.stringify(params.url) + ' error.response.headers ' + JSON.stringify(error.response.headers));
    //     response = error.response;
    //   } else if (error.request) {
    //   // The request was made but no response was received
    //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //   // http.ClientRequest in node.js
    //     logger.error(JSON.stringify(params.url) + ' error.request ' + JSON.stringify(error.request));
    //   } else {
    //   // Something happened in setting up the request that triggered an Error
    //     logger.error(JSON.stringify(params.url) + ' error.message ' + JSON.stringify(error.message));
    //   }
    //   logger.error(JSON.stringify(params.url) + ' error.config ' + JSON.stringify(error.config));
    // })
    ;

    // logger.warn(JSON.stringify(params.url) + ' response.headers ' + JSON.stringify(response.headers));
    // logger.warn(JSON.stringify(params.url) + ' typeof response ' + JSON.stringify(typeof response));
    // logger.warn(JSON.stringify(params.url) + ' response ' + JSON.stringify(response));

    cookieObject = cookieParser(response?.headers);

    return { data: response?.data, headers: response?.headers, cookieObject };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      logger.error(JSON.stringify(params.url) + ' error.response.data ' + JSON.stringify(error.response.data));
      logger.error(JSON.stringify(params.url) + ' error.response.status ' + JSON.stringify(error.response.status));
      logger.error(JSON.stringify(params.url) + ' error.response.headers ' + JSON.stringify(error.response.headers));
      // response = error.response;
      cookieObject = cookieParser(error.response?.headers);
      return { data: error.response?.data, headers: error.response?.headers, cookieObject };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      logger.error(JSON.stringify(params.url) + ' error.request ' + JSON.stringify(error.request));
    } else {
      // Something happened in setting up the request that triggered an Error
      logger.error(JSON.stringify(params.url) + ' error.message ' + JSON.stringify(error.message));
    }
    logger.error(JSON.stringify(params.url) + ' error.config ' + JSON.stringify(error.config));
    // TODO: Only log this in dev
    // logger.error(error);

  }

  // response = await context.client(params)
  //   .then((response) => {
  //     cookieObject = cookieParser(response?.headers);
  //     return { data: response?.data, headers: response?.headers, response, cookieObject };
  //   })
  //   .catch((error) => {
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       logger.error(JSON.stringify(params.url) + ' error.response.data ' + JSON.stringify(error.response.data));
  //       logger.error(JSON.stringify(params.url) + ' error.response.status ' + JSON.stringify(error.response.status));
  //       logger.error(JSON.stringify(params.url) + ' error.response.headers ' + JSON.stringify(error.response.headers));
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //       // http.ClientRequest in node.js
  //       logger.error(JSON.stringify(params.url) + ' error.request ' + JSON.stringify(error.request));
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       logger.error(JSON.stringify(params.url) + ' error.message ' + JSON.stringify(error.message));
  //     }
  //     logger.error(JSON.stringify(params.url) + ' error.config ' + JSON.stringify(error.config));
  //   });
  //
  // logger.error(JSON.stringify(params.url) + ' response ' + JSON.stringify(response));
  // cookieObject = cookieParser(response?.headers);
  // return { data: response?.data, headers: response?.headers, response, cookieObject };

  // logger.info('Data');
  // logger.info(data?.psdata?.menuItems);

  // logger.warn('Headers');
  // logger.warn(headers);
  //
  // logger.warn('Client');
  // logger.warn(context.client);
  //
  // logger.warn('Client Headers');
  // logger.warn(context.client.defaults.headers);
  //
  // logger.warn('context.$prestashop.config');
  // logger.warn(context.$prestashop.config.app);
  //
  // logger.info('cookieParser\'s cookieObject');
  // logger.info(cookieObject);
}
