import minPartTime from '../src/scripts/part.time.js';
import titles from '../src/scripts/titles.js';
import assert from "assert";

describe('Minimum Percent', () => {
    titles.forEach((title) => {
        let str_title = title[0];
        [1756, 1732, 1700].forEach(hours => {

            let min_percent = minPartTime(title[1], hours)
            it(`${str_title} w/ ${hours} has to be less than 100%`, () => {
                assert.ok(min_percent < 100);
            })
            it(`${str_title} w/ ${hours} has to be greater than base`, () => {
                assert.ok(min_percent > Math.round(title[1].base * 100));
            })
            let min_hours = (min_percent * hours / 100)
            let research_hours = title[1].research * min_hours
            let teaching_hours = 0.2 * min_hours
            let rest = min_hours - research_hours - teaching_hours;
            let target = title[1].base * hours
            it(`${str_title} w/ ${hours} leaves space for teaching & research`, () => {
                assert.ok(target <= rest);
            })

        });
    });
});
