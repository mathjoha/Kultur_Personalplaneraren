import divideHours from "../src/scripts/main.js";
import assert from "assert";

it('Sum to 100 w/o external funds', () => {
    const title = { 'base': 0.1, "research": 0.1, "teaching": 0.7, "dev": 0 };
    const sum = divideHours(title, 0).reduce((a, b) => (a + b), 0);
    assert.equal(sum, 100);

});


it('Sum to 100', () => {
    const title = { 'base': 0.1, "research": 0.1, "teaching": 0.7, "dev": 10 };
    const sum = divideHours(title, 0).reduce((a, b) => (a + b), 0);
    assert.equal(sum, 100);

});

it('Lower teaching threshold', () => {
    const title = { 'base': 0.1, "research": 0.1, "teaching": 0.7, "dev": 0 };
    const teaching = divideHours(title, 0)[1]
    assert.ok(teaching >= 20);
});
