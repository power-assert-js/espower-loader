module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: pkg,
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
