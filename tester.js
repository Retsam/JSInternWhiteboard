const throwFalse = thing => {
    if (!thing) throw new Error('failed test');
};

const testMethods = {
    all: bools => bools.reduce((r, v) => r && v, true),
    arrayEqual: (arr1, arr2) =>
        arr1.length === arr2.length &&
        testMethods.all(arr1.map((v, i) => arr2[i] === v)),
    equal: (thing1, thing2) => thing1 === thing2
};

const assert = Object.keys(testMethods).reduce((collection, key) => {
    collection[key] = (...args) => {
        try {
            throwFalse(testMethods[key](...args));
        } catch (e) {
            e.expected = args[1];
            e.got = args[0];
            throw e;
        }
    };
    return collection;
}, {});

const tester = (module.exports = {
    assert,
    testMethods,
    it: (msg, func) => {
        try {
            func();
            console.log('PASS:', msg, '\n');
        } catch (e) {
            console.error('FAIL:', msg);
            if (e.expected !== undefined)
                console.error('expected:', e.expected, 'got:', e.got, '\n');

            delete e.expected;
            delete e.got;

            if (e.message !== 'failed test') console.error(e);
        }
    },
    describe: (msg, f) => (console.log('\n' + msg), f())
});
