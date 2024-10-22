// const addHours = require('../src/scripts/addHours.js');
import addHours from '../src/scripts/hours.js';
import assert from "assert";

it('Calculate 1 row', () => {
    const data_in = [{ 'percent': 10 }]
    const hrs = 1000

    const data_target = [{ 'percent': 10, 'hours': 100 }];

    const data_out = addHours(data_in, hrs);

    console.log(data_out)

    assert.deepStrictEqual(data_out, data_target)
});


it('Calculate 3 rows', () => {
    const data_in = [
        { 'percent': 10 },
        { 'percent': 100 },
        { 'percent': 50 },
    ]
    const hrs = 1700

    const data_target = [
        { 'percent': 10, 'hours': 170 },
        { 'percent': 100, 'hours': 1700 },
        { 'percent': 50, 'hours': 850 },
    ];

    const data_out = addHours(data_in, hrs);

    assert.deepStrictEqual(data_out, data_target)


});
