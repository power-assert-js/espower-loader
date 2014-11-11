## [0.10.0](https://github.com/twada/espower-loader/releases/tag/v0.10.0) (2014-11-11)


* **espower-loader:**
  * update espower-source to 0.10.0 ([0994df9a](https://github.com/twada/espower-loader/commit/0994df9a82129bee712543f80bc94b16fe83f23f))


### 0.9.1 (2014-09-17)


#### Features

* **espower-loader:** update espower-source to 0.9.1 ([de14b9ad](https://github.com/twada/espower-loader/commit/de14b9ad5cc6d12a8193529fe6344608d2e23eaf))


## 0.9.0 (2014-09-02)


#### Features

* **espower-loader:** use espower-source 0.9.0 ([c5329f39](https://github.com/twada/espower-loader/commit/c5329f397d4ab8e434a1788d0fa1c2eb7670a25c))


## 0.8.0 (2014-08-12)


#### Features

* **espower-loader:** update espower-source to 0.8.0 ([54c2143b](https://github.com/twada/espower-loader/commit/54c2143bba3966aaf61f1a4d331f3543257f9222))


#### Breaking Changes

If you already customize instrumentation pattern using `powerAssertVariableName` and `targetMethods`, you need to migarte. To migrate, change your code from the following:

```javascript
require('espower-loader')({
    cwd: process.cwd(),
    pattern: 'test/**/*.js',
    espowerOptions: {
        powerAssertVariableName: 'yourAssert',
        targetMethods: {
            oneArg: [
                'okay'
            ],
            twoArgs: [
                'equal',
                'customEqual'
            ]
        }
    }
});
```

To:

```javascript
require('espower-loader')({
    cwd: process.cwd(),
    pattern: 'test/**/*.js',
    espowerOptions: {
        patterns: [
            'yourAssert(value, [message])',
            'yourAssert.okay(value, [message])',
            'yourAssert.equal(actual, expected, [message])',
            'yourAssert.customEqual(actual, expected, [message])'
        ]
    }
});
```
