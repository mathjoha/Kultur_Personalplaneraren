import minPartTime from '../src/scripts/part.time.js';
import updateBase from '../src/scripts/effective.base.js';
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
            let min_hours = Math.round((min_percent * hours / 100))
            let research_hours = Math.round(title[1].research * min_hours)
            let teaching_hours = Math.round(0.2 * min_hours)
            let rest = min_hours - research_hours - teaching_hours;
            let target = Math.round(title[1].base * hours)
            it(`${str_title} w/ ${hours} leaves space for teaching & research`, () => {
                assert.ok(target <= rest);
            })
            let updated_title = updateBase(title[1], hours, min_percent)
            let effective_other_hours = Math.round(updated_title.base * min_hours)
            it(`${str_title} w/ ${hours} updated other == target`, () => {
                assert.equal(effective_other_hours, Math.round(target));
            })

            it(`${str_title} w/ ${hours} updated base > original`, () => {
                assert.ok(updated_title.base > title[1].base);
            })

        });
    });
});

describe('Fulltime Percent', () => {
    titles.forEach((title) => {
        let str_title = title[0];
        [1756, 1732, 1700].forEach(hours => {

            let full_time_percent = 100
            let full_time_hours = Math.round((full_time_percent * hours / 100))
            let research_hours = Math.round(title[1].research * full_time_hours)
            let teaching_hours = Math.round(0.2 * full_time_hours)
            let rest = full_time_hours - research_hours - teaching_hours;
            let target = Math.round(title[1].base * hours)
            it(`${str_title} w/ ${hours} leaves space for teaching & research`, () => {
                assert.ok(target <= rest);
            })
            let updated_title = updateBase(title[1], hours, full_time_percent)
            let effective_other_hours = Math.round(updated_title.base * full_time_hours)
            it(`${str_title} w/ ${hours} updated other == target`, () => {
                assert.equal(effective_other_hours, target);
            })

            it(`${str_title} w/ ${hours} updated base == original ${updated_title.base}`, () => {
                assert.equal(Math.round(updated_title.base * 100), Math.round(100 * title[1].base))
            })

        });
    });
});
