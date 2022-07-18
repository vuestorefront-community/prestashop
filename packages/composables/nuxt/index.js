import path from 'path';

export default function integrationModule(moduleOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });
  this.addPlugin({
    src: path.resolve(__dirname, './cookie-plugin.js'),
    options: moduleOptions
  });
}
