import {cookieParser} from '../../helpers/cookieParser';
import {logger} from '../../helpers/logging';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function bootstrap(context, params) {

  let response;
  let cookieObject;
  try {
    response = await context.client(params);
    cookieObject = cookieParser(response?.headers);
    return { data: response?.data, headers: response?.headers, cookieObject };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      cookieObject = cookieParser(error.response?.headers);

      return { data: error.response?.data, headers: error.response?.headers, cookieObject };
    }
  }
}
