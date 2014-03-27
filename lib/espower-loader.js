/**
 * espower-loader.js - Power Assert feature instrumentor on the fly.
 *
 * https://github.com/twada/espower-loader
 *
 * Copyright (c) 2013-2014 Takuto Wada
 * Licensed under the MIT license.
 *   https://raw.github.com/twada/espower-loader/master/MIT-LICENSE.txt
 */
(function (root, factory) {
    'use strict';

    // using returnExports UMD pattern
    if (typeof define === 'function' && define.amd) {
        throw new Error('not supported yet');
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require.extensions,
            require('fs'),
            require('lodash.merge'),
            require('minimatch'),
            require('espower'),
            require('esprima'),
            require('escodegen')
        );
    } else {
        throw new Error('not supported');
    }
}(this, function (
    extensions,
    fs,
    merge,
    minimatch,
    espower,
    esprima,
    escodegen
) {
    'use strict';

    var originalLoader = extensions['.js'];

    function espowerLoader (options) {
        var pattern;
        extensions['.js'] = function(localModule, filepath) {
            if (options.pattern.lastIndexOf('/', 0) === 0) {
                pattern = options.cwd + options.pattern;
            } else {
                pattern = options.cwd + '/' + options.pattern;
            }
            // console.log('pattern: ' + pattern);
            if (minimatch(filepath, pattern)){
                // console.log('espower: ' + filepath);
                localModule._compile(instrument(filepath, options), filepath);
            } else {
                originalLoader(localModule, filepath);
            }
        };
    }

    function instrument (filepath, options) {
        var absPath = fs.realpathSync(filepath),
            jsCode = fs.readFileSync(filepath, 'utf-8'),
            jsAst = esprima.parse(jsCode, {tolerant: true, loc: true, range: true, tokens: true}),
            espowerOptions = merge(merge(espower.defaultOptions(), options.espowerOptions), {
                path: absPath,
                source: jsCode
            }),
            modifiedAst = espower(jsAst, espowerOptions);
        return escodegen.generate(modifiedAst);
    }

    // using returnExports UMD pattern with substack pattern
    return espowerLoader;
}));
