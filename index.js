/**
 * espower-loader - Power Assert feature instrumentor on the fly.
 *
 * https://github.com/twada/espower-loader
 *
 * Copyright (c) 2013-2015 Takuto Wada
 * Licensed under the MIT license.
 *   https://github.com/twada/espower-loader/blob/master/MIT-LICENSE.txt
 */
var extensions = require.extensions;
var originalLoader = extensions['.js'];
var fs = require('fs');
var minimatch = require('minimatch');
var convert = require('convert-source-map');
var espowerSourceToSource = require('espower-source');

function espowerLoader (options) {
    'use strict';

    var separator = (options.pattern.lastIndexOf('/', 0) === 0) ? '' : '/';
    var pattern = options.cwd + separator + options.pattern;
    var pathToMap = {};
    var sourceMapSupport = require('source-map-support');
    var originalRetrieveSourceMap = sourceMapSupport.retrieveSourceMap;
    sourceMapSupport.install({
        retrieveSourceMap: function (source) {
            if (minimatch(source, pattern) && pathToMap[source]) {
                return {
                    map: pathToMap[source]
                };
            }
            return originalRetrieveSourceMap(source);
        }
    });

    extensions['.js'] = function(localModule, filepath) {
        var output;
        if (minimatch(filepath, pattern)){
            output = espowerSourceToSource(fs.readFileSync(filepath, 'utf-8'), filepath, options.espowerOptions);
            var map = convert.fromSource(output).toObject();
            pathToMap[filepath] = map;
            localModule._compile(output, filepath);
        } else {
            originalLoader(localModule, filepath);
        }
    };
}

module.exports = espowerLoader;
