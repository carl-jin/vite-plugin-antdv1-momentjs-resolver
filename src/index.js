const fs = require('fs')

const exportFn = () => {
  return {
    name: 'vite-plugin-antdv1-momentjs-resolver',
    configResolved(config) {
      config.optimizeDeps.esbuildOptions.plugins = config.optimizeDeps.esbuildOptions.plugins ?? [];
      config.optimizeDeps.esbuildOptions.plugins.push({
        name: 'replace-code',
        setup(build) {
          build.onLoad({
            filter: /ant-design-vue\/[\w-\\\/]*\.js$/
          }, (args) => {
            // 首先获取源代码内容
            let source = fs.readFileSync(args.path, 'utf8');
            if (source.indexOf('import * as moment from')) {
              source = source.replace(/import\s\*\sas\smoment\sfrom/g, 'import moment from');
            }
            return {
              contents: source
            };
          });
        },
      });
    },
  }
};

module.exports = exportFn
