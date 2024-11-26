import divideHours from "../src/scripts/main.js";
import assert from "assert";
import updateBase from '../src/scripts/effective.base.js';
import minPartTime from "../src/scripts/part.time.js";


describe('Parametrize hours', () => {
    [0.05, 0.1, 0.15].forEach((base) => {
        for (let teach = 0.2; teach <= 0.7; teach += 0.05) {
            let research = 1 - base - teach;
            const target_research = Math.round(research * 100);
            for (let bidrag = 0; bidrag <= 100 - base * 100 - 10; bidrag += 5) {

                const raw_title = {
                    'base': base,
                    "teaching": teach,
                    "research": research,
                }
                const min_part_time = minPartTime(raw_title, 1700)
                for (let part = min_part_time; part < 70; part += 10) {

                    const title = updateBase(raw_title, 1700, part)
                    const target_base = Math.round(title.base * 10000) / 100;

                    const result = divideHours(title, bidrag, part);
                    const total_research = 100 - result[0] - result[1]
                    describe(`${part} Inputs: base: ${target_base}, teaching: ${Math.round(teach * 100)}. research: ${target_research}, bidrag: ${bidrag}`, () => {
                        it(`Assigned ${result[1]}% >= 20% teaching`, () => {
                            assert.ok(result[1] >= 20)
                        })

                        it(`Sum to 100`, () => {
                            const sum = Math.round(result.reduce((a, b) => (a + b), 0));
                            assert.equal(sum, 100);
                        })
                        it(`Exactly ${target_base}% other`, () => {
                            assert.equal(result[0], target_base)
                        })
                        it(`Assigned ${total_research}% >= ${target_research}% research`, () => {
                            assert.ok(total_research, target_research)
                        })
                    })

                }
            }
        }
    })
});
