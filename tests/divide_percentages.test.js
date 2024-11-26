import divideHours from "../src/scripts/main.js";
import assert from "assert";

it('Sum to 100 w/o external funds', () => {
    const title = { 'base': 0.1, 'natural_base': 0.1, "research": 0.20, "teaching": 0.7 };
    const sum = divideHours(title, 0, 100).reduce((a, b) => (a + b), 0);
    assert.equal(sum, 100);

});


it('Sum to 100', () => {
    const title = { 'base': 0.1, 'natural_base': 0.1, "research": 0.2, "teaching": 0.7 };
    const sum = divideHours(title, 0).reduce((a, b) => (a + b), 0);
    assert.equal(sum, 100);

});

it('Lower teaching threshold', () => {
    const title = { 'base': 0.1, 'natural_base': 0.1, "research": 0.2, "teaching": 0.7 };
    const teaching = divideHours(title, 0)[1]
    assert.ok(teaching >= 20);
});
