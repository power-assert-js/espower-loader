var minimatch = require('minimatch'),
    path = require('path'),
    assert = require('assert');

describe('minimatch learning', function () {

    describe ('simplest match', function () {
        it('extension', function () {
            assert(minimatch('bar.js', '*.js'));
        });
        it('path', function () {
            assert(minimatch('/foo/bar/baz.js', '/foo/bar/*.js'));
        });
    });

    it('does not normailze', function () {
        assert(! minimatch('/foo/bar/baz.js', '/foo/hoge/../bar/*.js'));
    });

    describe('cwd and forward slash', function () {
        beforeEach(function () {
            this.filepath = path.join(process.cwd(), 'test', 'foo', 'hoge.js');
        });
        it('starts with process.cwd() and not with forward slash', function () {
            assert(! minimatch(this.filepath, process.cwd() + 'test/**/*.js'));
        });
        it('starts with process.cwd() then forward slash', function () {
            assert(minimatch(this.filepath, process.cwd() + '/' + 'test/**/*.js'));
        });
        it('starts with wildcard', function () {
            assert(minimatch(this.filepath, '**/test/**/*.js'));
        });
    });

    describe('patterns', function () {
        describe('test/**/*.coffee', function () {
            beforeEach(function () {
                this.pattern = 'test/**/*.coffee';
            });
            it('does not match to helper', function () {
                assert(! minimatch('helper/test.coffee', this.pattern));
            });
            it('matches to test', function () {
                assert(minimatch('test/helper/test.coffee', this.pattern));
            });
        });
        describe('{test,helper}/**/*.coffee', function () {
            beforeEach(function () {
                this.pattern = '{test,helper}/**/*.coffee';
            });
            it('matches to helper', function () {
                assert(minimatch('helper/test.coffee', this.pattern));
            });
            it('matches to test', function () {
                assert(minimatch('test/helper/test.coffee', this.pattern));
            });
        });
    });

});
