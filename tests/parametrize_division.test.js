import divideHours from "../src/scripts/main.js";
import assert from "assert";

describe('Parametrize hours', () => {
    [0.05, 0.1, 0.15].forEach((base) => {
        for (let teach = 0.2; teach <= 0.7; teach += 0.05) {
            let research = 1 - base - teach;
            const target_research = Math.round(research * 100);
            for (let bidrag = 0; bidrag <= 100 - base * 100 - 20; bidrag += 5) {
                const title = { 'base': base, "research": research, "teaching": teach, "dev": 0 };
                const result = divideHours(title, bidrag);
                describe(`base: ${Math.round(base * 100)}, teaching: ${Math.round(teach * 100)}. research: ${target_research}, bidrag: ${bidrag}`, () => {
                    it(`Sum to 100`, () => {
                        const sum = Math.round(result.reduce((a, b) => (a + b), 0)) + bidrag;
                        assert.equal(sum, 100);
                    })
                    it(`Minimum teaching`, () => {
                        assert.ok(result[1] >= 20)
                    })
                    it(`Minimum research`, () => {
                        assert.ok(100 - result[0] - result[1], target_research)
                    })

                })
            }
        }
    }
    )
});
