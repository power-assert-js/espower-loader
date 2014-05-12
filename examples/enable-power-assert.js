require('espower-loader')({

    // directory where match starts with
    cwd: process.cwd(),

    // glob pattern using minimatch module
    pattern: 'test/**/*.js',

    // options for espower module
    espowerOptions: {
        powerAssertVariableName: 'assert',
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
