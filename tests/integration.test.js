import divideHours from "../src/scripts/main.js";
import buildData from "../src/scripts/matrix.js";
import addHours from '../src/scripts/hours.js';
import titles from '../src/scripts/titles.js';
import assert from "assert";
import updateBase from '../src/scripts/effective.base.js';

describe('Test hours division', () => {
    describe('Lektor target at 1700h & 0%', () => {

        const raw_title = titles.find(title => title[0] === 'Lektor')[1];
        const title = updateBase(raw_title, 1700)
        const [basep,
            teachp,
            re_othp,
            re_bidrag
        ] = divideHours(title, 0);
        const data = addHours(buildData(
            basep, teachp, re_othp, re_bidrag
        ), 1700);
        it('Lektor h-teach at 1700h & 0% ', () => {
            assert.equal(data[1].hours, 1190)
        });
        it('Lektor h-research at 1700h & 0% ', () => {

            assert.equal(data[2].hours, 340)
        });
        it('Lektor h-bidrag at 1700h & 0% ', () => {

            assert.equal(data[3].hours, 0)
        });
        it('Lektor sum at 1700h & 0% ', () => {
            assert.equal(data.reduce((a, b) => (a + b.hours), 0), 1700)
        });
        it(`Lektor h-other at 1700h & 0% ${title.natural_base}`, () => {
            assert.equal(data[0].hours, 170)
        });

    })
    describe('Professor target at 1700h & 0%', () => {

        const raw_title = titles.find(title => title[0] === 'Professor')[1];
        const title = updateBase(raw_title, 1700)
        const [basep,
            teachp,
            re_othp,
            re_bidrag
        ] = divideHours(title, 0);
        const data = addHours(buildData(
            basep, teachp, re_othp, re_bidrag
        ), 1700);
        it('Professor h-other at 1700h & 0% ', () => {
            assert.equal(data[0].hours, 85)
        })
        it('Professor h-teach at 1700h & 0% ', () => {
            assert.equal(data[1].hours, 748)
        })
        it('Professor h-research at 1700h & 0% ', () => {
            assert.equal(data[2].hours, 867)
        })
        it('Professor h-bidrag at 1700h & 0% ', () => {
            assert.equal(data[3].hours, 0)
        })
        it('Professor sum at 1700h & 0% ', () => {
            assert.equal(data.reduce((a, b) => (a + b.hours), 0), 1700)
        })
    })
    describe('Docent target at 1700h & 0%', () => {

        const raw_title = titles.find(title => title[0] === 'Lektor med docentkompetens')[1];
        const title = updateBase(raw_title, 1700)

        const [basep,
            teachp,
            re_othp,
            re_bidrag
        ] = divideHours(title, 0);
        const data = addHours(buildData(
            basep, teachp, re_othp, re_bidrag
        ), 1700);
        it('Docent h-other at 1700h & 0% ', () => {
            assert.equal(data[0].hours, 170)
        })
        it('Docent h-teach at 1700h & 0% ', () => {
            assert.equal(data[1].hours, 1105)
        })
        it('Docent h-research at 1700h & 0% ', () => {
            assert.equal(data[2].hours, 425)
        })
        it('Docent h-bidrag at 1700h & 0% ', () => {
            assert.equal(data[3].hours, 0)
        })
        it('Docent sum at 1700h & 0% ', () => {
            assert.equal(data.reduce((a, b) => (a + b.hours), 0), 1700)
        })
    });
})
