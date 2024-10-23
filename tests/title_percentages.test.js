import titles from '../src/scripts/titles.js';
import assert from "assert";

describe('Title percentages', () => {
    titles.forEach(title => {
        let str_title = title[0];
        it(`${str_title} adds up to 100%`, () => {
            let total = title[1].base + title[1].research + title[1].teaching;
            assert.equal(total, 1);
        });
    });
});
