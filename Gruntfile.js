module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    (function () {
        var taskName;
        for(taskName in pkg.devDependencies) {
            if(taskName.substring(0, 6) === 'grunt-') {
                grunt.loadNpmTasks(taskName);
            }
        }
    })();

    grunt.initConfig({
        pkg: pkg,
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: '%VERSION%',
                commitFiles: ['package.json', 'bower.json'], // '-a' for all files
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: '%VERSION%',
                push: false,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
            }
        },
        jshint: {
            files: [
                'lib/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        mochaTest: {
            unit: {
                options: {
                    reporter: 'dot'
                },
                src: ['test/unit/**/*.js']
            },
            tobe_instrumented: {
                options: {
                    reporter: 'dot',
                    require: './test_loader/enable-power-assert'
                },
                src: ['test/tobe_instrumented/*.js']
            },
            not_tobe_instrumented: {
                options: {
                    reporter: 'dot'
                },
                src: ['test/not_tobe_instrumented/*.js']
            }
        }
    });

    grunt.registerTask('test', ['jshint', 'mochaTest:unit', 'mochaTest:tobe_instrumented', 'mochaTest:not_tobe_instrumented']);
};
