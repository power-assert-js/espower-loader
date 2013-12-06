espower-loader
================================

Power Assert feature instrumentor on the fly.


DESCRIPTION
---------------------------------------
`espower-loader` is a Node.js module loader that enhances target sources on the fly. So you can instrument Power Assert feature without code generation for now.

`espower-loader` applies [espower](http://github.com/twada/espower) to target sources on loading them. `espower` manipulates assertion expression (JavaScript Code) represented as [Mozilla JavaScript AST](https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API), to instrument power-assert feature into the code.

Please note that `espower-loader` is an alpha version product. Pull-requests, issue reports and patches are always welcomed. See [power-assert](http://github.com/twada/power-assert) project for more documentation.


EXAMPLE
---------------------------------------

You can instrument `power-assert` without code generation (e.g. withoug using `grunt-espower`).

For mocha, Just add `--require` option.

    $ mocha --require ./enable-power-assert test/some_test_using_powerassert.js

where `enable-power-assert.js` in current directory is,

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
