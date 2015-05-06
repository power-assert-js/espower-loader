var empower = require('empower');
var formatter = require('power-assert-formatter')();
var assert = empower(require('assert'), formatter);
var expect = require('expect.js');

describe('power-assert client should work with not-instrumented code', function () {
    beforeEach(function () {
        this.expectAssertMessage = function (body) {
            try {
                body();
            } catch (e) {
                expect(e.message).to.be('plain assertion message');
                expect(e.name).to.be('AssertionError');
                return;
            }
            expect().fail("AssertionError should be thrown");
        };
    });

    it('Nested CallExpression with BinaryExpression: assert((three * (seven * ten)) === three);', function () {
        var one = 1, two = 2, three = 3, seven = 7, ten = 10;
        this.expectAssertMessage(function () {
            assert.ok((three * (seven * ten)) === three, 'plain assertion message');
        });
    });

    it('equal with Literal and Identifier: assert.equal(1, minusOne);', function () {
        var minusOne = -1;
        this.expectAssertMessage(function () {
            assert.equal(1, minusOne, 'plain assertion message');
        });
    });
});
