import divideHours from "../src/scripts/main.js";
import buildData from "../src/scripts/matrix.js";
import addHours from '../src/scripts/hours.js';
import titles from '../src/scripts/titles.js';
import assert from "assert";

describe('Test hours division', () => {
    it('Lektor target at 1700h & 0% ', () => {
        const title = titles.find(title => title[0] === 'Lektor')[1];
        const [basep,
            teachp,
            re_othp,
        ] = divideHours(title, 0);
        const data = addHours(buildData(
            basep, teachp, re_othp, 0
        ), 1700);
        assert.equal(data[0].hours, 170)

        assert.equal(data[1].hours, 1190)
        assert.equal(data[2].hours, 340)
        assert.equal(data[3].hours, 0)
        assert.equal(data.reduce((a, b) => (a + b.hours), 0), 1700)
    });


    it('Professor target at 1700h & 0% ', () => {
        const title = titles.find(title => title[0] === 'Professor')[1];
        const [basep,
            teachp,
            re_othp,
        ] = divideHours(title, 0);
        const data = addHours(buildData(
            basep, teachp, re_othp, 0
        ), 1700);
        assert.equal(data[0].hours, 85)

        assert.equal(data[1].hours, 867)
        assert.equal(data[2].hours, 748)
        assert.equal(data[3].hours, 0)
        assert.equal(data.reduce((a, b) => (a + b.hours), 0), 1700)
    });

    it('Docent target at 1700h & 0% ', () => {
        const title = titles.find(title => title[0] === 'Lektor med docentkompetens')[1];
        const [basep,
            teachp,
            re_othp,
        ] = divideHours(title, 0);
        const data = addHours(buildData(
            basep, teachp, re_othp, 0
        ), 1700);
        assert.equal(data[0].hours, 170)

        assert.equal(data[1].hours, 1105)
        assert.equal(data[2].hours, 425)
        assert.equal(data[3].hours, 0)
        assert.equal(data.reduce((a, b) => (a + b.hours), 0), 1700)
    });

});
