const fs = require("fs");
const replace = require("@rollup/plugin-replace");

const defaultReg = /ant-design-vue\/[\w-\\\/]*\.js$/;
const exportFn = (reg = defaultReg) => {
  return {
    name: "vite-plugin-antdv1-momentjs-resolver",
    configResolved(config) {
      //  以来预构建时候替换 esbuild
      config.optimizeDeps.esbuildOptions.plugins = config.optimizeDeps
        .esbuildOptions.plugins
        ? config.optimizeDeps.esbuildOptions.plugins
        : [];
      config.optimizeDeps.esbuildOptions.plugins.push({
        name: "replace-code",
        setup(build) {
          build.onLoad(
            {
              filter: reg,
            },
            (args) => {
              // 首先获取源代码内容
              let source = fs.readFileSync(args.path, "utf8");
              if (source.indexOf("import * as moment from")) {
                source = source.replace(
                  /import\s\*\sas\smoment\sfrom/g,
                  "import moment from"
                );
              }
              return {
                contents: source,
              };
            }
          );
        },
      });

      //  添加打包时的替换 rollup
      config.plugins.push(
        replace({
          values: {
            "import * as moment from": (id) => {
              return "import moment from";
            },
          },
          include: [reg],
          preventAssignment: true,
        })
      );
    },
  };
};

module.exports = exportFn;
