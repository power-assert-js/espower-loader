espower-loader
================================

[![Build Status](https://travis-ci.org/twada/espower-loader.png?branch=master)](https://travis-ci.org/twada/espower-loader)
[![NPM version](https://badge.fury.io/js/espower-loader.png)](http://badge.fury.io/js/espower-loader)
[![Dependency Status](https://gemnasium.com/twada/espower-loader.png)](https://gemnasium.com/twada/espower-loader)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Power Assert feature instrumentor on the fly.


DESCRIPTION
---------------------------------------
`espower-loader` is a Node.js module loader that enhances target sources on the fly. So you can instrument Power Assert feature without code generation for now.

`espower-loader` applies [espower](http://github.com/twada/espower) to target sources on loading them. `espower` manipulates assertion expression (JavaScript Code) represented as [Mozilla JavaScript AST](https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API), to instrument power-assert feature into the code.

Please note that `espower-loader` is a beta version product. Pull-requests, issue reports and patches are always welcomed. See [power-assert](http://github.com/twada/power-assert) project for more documentation.


FYI: You may be interested in [intelli-espower-loader](https://github.com/azu/intelli-espower-loader) to go one step further. With [intelli-espower-loader](https://github.com/azu/intelli-espower-loader), you don't need to create loader file (like `enable-power-assert.js`). Just define test directory in `package.json` wow!


EXAMPLE
---------------------------------------

You can instrument `power-assert` without code generation (e.g. without using `grunt-espower`).

For mocha, Just add `--require` option.

    $ mocha --require ./path/to/enable-power-assert test/some_test_using_powerassert.js

where `enable-power-assert.js` somewhere in your project is,

```javascript
require('espower-loader')({
    cwd: process.cwd(),
    pattern: 'test/**/*.js'
});
```

You can specify `espower` options explicitly.

```javascript
require('espower-loader')({

    // directory where match starts with
    cwd: process.cwd(),

    // glob pattern using minimatch module
    pattern: 'test/**/*.js',

    // options for espower module
    espowerOptions: {
        destructive: false,
        powerAssertVariableName: 'assert',
        lineSeparator: '\n',
        targetMethods: {
            oneArg: [
                'ok'
            ],
            twoArgs: [
                'equal',
                'notEqual',
                'strictEqual',
                'notStrictEqual',
                'deepEqual',
                'notDeepEqual'
            ]
        }
    }
});
```


AUTHOR
---------------------------------------
* [Takuto Wada](http://github.com/twada)


LICENSE
---------------------------------------
Licensed under the [MIT](https://raw.github.com/twada/espower-loader/master/MIT-LICENSE.txt) license.
