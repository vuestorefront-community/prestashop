import path from 'path';

export default function integrationModule(moduleOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });
  // TODO: Not sure if this should be used, but might be necessary for cookies on SSR
  // this.addPlugin({
  //   src: path.resolve(__dirname, './cookie-plugin.js'),
  //   options: moduleOptions
  // });
}
