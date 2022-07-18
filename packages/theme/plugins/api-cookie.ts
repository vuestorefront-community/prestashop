import type { Plugin } from '@nuxt/types';

const plugin: Plugin = ({ app }) => {
  const isSSR: boolean = process.server;


  // if (isSSR) {
    // app.$vsf.$occ.client.interceptors.response.use((response) => {
    //   console.log('response.headers: ' + JSON.stringify(response.headers));
    //   if (response.headers) {
    //     const setCookie = response.headers['set-cookie'];
    //     if (setCookie) {
    //       app.context.res.setHeader('Set-cookie', setCookie);
    //     }
    //   }
    //   return response;
    // });
  // }
};

export default plugin;
