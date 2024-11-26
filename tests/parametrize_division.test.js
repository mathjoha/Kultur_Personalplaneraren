import divideHours from "../src/scripts/main.js";
import assert from "assert";

describe('Parametrize hours', () => {
    [0.05, 0.1, 0.15].forEach((base) => {
        const target_base = Math.round(base * 10000) / 100;
        for (let teach = 0.2; teach <= 0.7; teach += 0.05) {
            let research = Math.round(1000 * (1 - base - teach)) / 10000;
            const target_research = Math.round(research * 100);
            for (let bidrag = 0; bidrag <= 100 - base * 100 - 20; bidrag += 5) {

                const title = {
                    'base': base,
                    "research": research,
                    "teaching": teach,
                    "natural_base": base,
                };

                const result = divideHours(title, Math.round(10000 * bidrag) / 100);
                const total_research = 100 - result[0] - result[1]
                describe(`Inputs: base: ${target_base}, teaching: ${Math.round(teach * 100)}. research: ${target_research}, bidrag: ${bidrag}`, () => {
                    it(`Sum to 100`, () => {
                        const sum = Math.round(result.reduce((a, b) => (a + b), 0)) + bidrag;
                        assert.equal(sum, 100);
                    })
                    it(`Exactly ${target_base}% other`, () => {
                        assert.ok(result[0] >= target_base)
                    })
                    it(`Assigned ${result[1]}% >= 20% teaching`, () => {
                        assert.ok(result[1] >= 20)
                    })
                    it(`Assigned ${total_research}% >= ${target_research}% research`, () => {
                        assert.ok(total_research, target_research)
                    })

                })
            }
        }
    }
    )
});
