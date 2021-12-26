# vite-plugin-antdv1-momentjs

Solve the Bug of vite execution error because antd-vue version 1.7.8 imported moment by using interopDefault

Check the detail here [#375](https://github.com/vueComponent/ant-design-vue/issues/3715)

The main purpose of this plugin is to replace `import * as moment from "mooment"`  in ant-design-vue.

```javascript
  source = source.replace(/import\s\*\sas\smoment\sfrom/g, 'import moment from');
```

处理因为 ant-design 1.7.8 版本中使用了 `import * as moment from "moment"` 这种写法，导致在使用 vite 时，报错问题。

具体细节请查看 [#375](https://github.com/vueComponent/ant-design-vue/issues/3715)


# Usage

```shell
$ yarn add vite-plugin-antdv1-momentjs
```

```typescript
//  vite.cofnig.ts

import AntdMomentResovler from 'vite-plugin-antdv1-momentjs'

export default defineConfig(({ command }) => {
  return {
    plugins:[AntdMomentResovler()]
  }
})
```
