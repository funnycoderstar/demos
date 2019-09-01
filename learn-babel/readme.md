

## 示例
1. 验证 只转语法，不转api
```js
module.exports = {
    presets: [
        "@babel/preset-env",
    ]
}
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var a = 1;

var A = function A() {
  _classCallCheck(this, A);
};

;
new Promise(function (resolve, reject) {});
console.log(Array.of(3, 11, 8));
console.log([1, 2, 3].includes(2));
```

2.  自动引入 @babel/polyfill, 如果不指定，默认为引入 corejs:2
```js
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage"
            }
        ]
        
    ]
}

"use strict";

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.of");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var a = 1;

var A = function A() {
  _classCallCheck(this, A);
};

;
new Promise(function (resolve, reject) {});
console.log(Array.of(3, 11, 8));
console.log([1, 2, 3].includes(2));
```


3.  引入 "corejs": 3
```js
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ]
        
    ]
}

"use strict";

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var a = 1;

var A = function A() {
  _classCallCheck(this, A);
};

;
new Promise(function (resolve, reject) {});
console.log(Array.of(3, 11, 8));
console.log([1, 2, 3].includes(2));
```

4. 配置"modules": false， 改成了 es module的用法
```js
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3,
                "modules": false,
            }
        ]
        
    ]
}

import "core-js/modules/es.array.includes";
import "core-js/modules/es.array.of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var a = 1;

var A = function A() {
  _classCallCheck(this, A);
};

;
new Promise(function (resolve, reject) {});
console.log(Array.of(3, 11, 8));
console.log([1, 2, 3].includes(2));
```

5. 配置  @babel/plugin-transform-runtime，
```js
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3,
                "modules": false,
            }
        ]
    ],
    plugins: [
        '@babel/plugin-transform-runtime'
    ]
}

import "core-js/modules/es.array.includes";
import "core-js/modules/es.array.of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
var a = 1;

var A = function A() {
  _classCallCheck(this, A);
};

;
new Promise(function (resolve, reject) {});
console.log(Array.of(3, 11, 8));
console.log([1, 2, 3].includes(2));
```

6，只配置 @babel/plugin-transform-runtime， 去掉 @babel/polyfill
```js
module.exports = {
    presets: [
        "@babel/preset-env",
    ],
    plugins: [
        '@babel/plugin-transform-runtime'
    ]
}

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var a = 1;

var A = function A() {
  (0, _classCallCheck2["default"])(this, A);
};

;
new Promise(function (resolve, reject) {});
console.log(Array.of(3, 11, 8));
console.log([1, 2, 3].includes(2));
```
7. 配置 @babel/plugin-transform-runtime  自动引入@babel/runtime-corejs2的内容
```js
module.exports = {
    presets: [
        [
            "@babel/preset-env",
        ]
    ],
    plugins: [
        ['@babel/plugin-transform-runtime', { corejs: 2}]
    ]
}

"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _of = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/of"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var a = 1;

var A = function A() {
  (0, _classCallCheck2["default"])(this, A);
};

;
new _promise["default"](function (resolve, reject) {});
console.log((0, _of["default"])(3, 11, 8));
console.log([1, 2, 3].includes(2));
```
8. 配置使用  @babel/runtime-corejs3
```js
module.exports = {
    presets: [
        [
            "@babel/preset-env",
        ]
    ],
    plugins: [
        ['@babel/plugin-transform-runtime', { corejs: 3}]
    ]
}

"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _of = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/of"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _context;

var a = 1;

var A = function A() {
  (0, _classCallCheck2["default"])(this, A);
};

;
new _promise["default"](function (resolve, reject) {});
console.log((0, _of["default"])(3, 11, 8));
console.log((0, _includes["default"])(_context = [1, 2, 3]).call(_context, 2));
```
## 总结

- @babel/runtime 就是把 辅助函数，regenerator-runtime/runtime 封装在了一起
- @babel/runtime-corej其实就是把 core-js, 辅助函数， regenerator-runtime/runtime 封装在了一起


因此 @babel/runtime-corejs 不仅能代替 @babel/runtime, 而且还提供了不会污染全局作用域的polyfill
@babel/runtime-corejs2无法为实例方法提供 polyfill, 而@babel/runtime-corejs3可以


以下配置
1. 将公共的 helper函数 抽出，可以提供复用，减小代码体积
2. 提供了不会污染全局作用域的polyfill
```js
module.exports = {
    presets: [
        "@babel/preset-env",
    ],
    plugins: [
        [   '@babel/plugin-transform-runtime', 
            { corejs: 3 }
        ]
    ]
}
```

以下配置
1. 将公共的 helper函数 抽出，可以提供复用，较小代码体积
2. 但是 polyfill 可能 污染全局作用域
```js
module.exports = {
    presets: [
       [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3,
                "modules": false,
            }
        ]
    ],
    plugins: [
        '@babel/plugin-transform-runtime', 
    ]
}
```
