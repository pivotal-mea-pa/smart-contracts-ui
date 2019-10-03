var assert = require('assert');
describe('Basic Mocha String Test', function () {
 it(' unit test #1 of smart-contracts-ui', function () {
        assert.equal("Hello".length, 4);
    });
 it('unit test #2 of smart-contracts-ui', function () {
        assert.equal("Hello".charAt(0), 'H');
    });
});