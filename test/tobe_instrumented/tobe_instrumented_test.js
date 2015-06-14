var empower = require('empower');
var formatter = require('power-assert-formatter')();
var assert = empower(require('assert'), formatter);
var expect = require('expect.js');

describe('power-assert message', function () {
    
    it('Nested CallExpression with BinaryExpression: assert((three * (seven * ten)) === three);', function () {
        var one = 1, two = 2, three = 3, seven = 7, ten = 10;
        this.expectPowerAssertMessage(function () {
            assert((three * (seven * ten)) === three);
        }, [
            '  assert(three * (seven * ten) === three)',
            '         |     |  |     | |    |   |     ',
            '         |     |  |     | |    |   3     ',
            '         |     |  |     | 10   false     ',
            '         |     |  7     70               ',
            '         3     210                       ',
            '  ',
            '  [number] three',
            '  => 3',
            '  [number] three * (seven * ten)',
            '  => 210'
        ], 11, 13);
    });

    it('equal with Literal and Identifier: assert.equal(1, minusOne);', function () {
        var minusOne = -1;
        this.expectPowerAssertMessage(function () {
            assert.equal(1, minusOne);
        },[
            '  assert.equal(1, minusOne)',
            '                  |        ',
            '                  -1       '
        ], 30, 20);
    });

    beforeEach(function () {
        this.expectPowerAssertMessage = function (body, expectedDiagram, expectedLine, expectedColumn) {
            try {
                body();
            } catch (e) {
                expect(e.message.split('\n').slice(2, -1)).to.eql(expectedDiagram.map(function (line) {
                    return line;
                }));
                expect(e.stack).to.match(new RegExp("test\/tobe_instrumented\/tobe_instrumented_test.js:" + expectedLine + ":" + expectedColumn + "\n"));
                expect(e.stack).to.match(new RegExp("AssertionError:\\s*\\#\\s*test\/tobe_instrumented\/tobe_instrumented_test.js:" + expectedLine + "\n"));
                return;
            }
            expect().fail("AssertionError should be thrown");
        };
    });
});
