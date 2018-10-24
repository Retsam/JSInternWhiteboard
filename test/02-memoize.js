const memoize = require('../questions/02-memoize');
const { it, assert, describe } = require('../tester');

describe('memoize', () => {
    it('should call a function with no arguments once', () => {
        let callCount = 0;

        const func = () => {
            callCount += 1;
        };

        const resultFunc = memoize(func);

        resultFunc();
        resultFunc();

        assert.equal(callCount, 1);
    });

    it('should remember the result from a function with no arguments', () => {
        let callCount = 0;

        const func = () => {
            callCount += 1;
            return callCount;
        };

        const memoizeFunc = memoize(func);

        const first = memoizeFunc();
        const second = memoizeFunc();

        assert.equal(first, 1);
        assert.equal(second, 1);
    });

    it('should return the correct result from memoized functions with arguments', () => {
        let sum = 0;
        const addToSum = x => {
            sum += x;
            return sum;
        };

        const memoizedAddToSum = memoize(addToSum);

        const one = memoizedAddToSum(1);
        const three = memoizedAddToSum(2);
        const six = memoizedAddToSum(3);

        assert.equal(one, 1);
        assert.equal(three, 3);
        assert.equal(six, 6);
    });

    it('should return a function that computes the result of another function once per input value', () => {
        let sum = 0;
        const addToSum = x => {
            sum += x;
            return sum;
        };

        const memoizedAddToSum = memoize(addToSum);

        const two = memoizedAddToSum(2);
        const five = memoizedAddToSum(3);

        const stillFive = memoizedAddToSum(3);
        const stillTwo = memoizedAddToSum(2);

        assert.equal(two, 2);
        assert.equal(five, 5);
        assert.equal(stillFive, 5);
        assert.equal(stillTwo, 2);
    });
});
