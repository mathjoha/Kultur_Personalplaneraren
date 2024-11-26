export default function divideHours(title, bidrag, deltid) {

    const bidrag_as_ratio = Math.min(bidrag / deltid, 1 - title.base - 0.2)
    const available = deltid - bidrag - title.natural_base * 100
    // const unused = available - (1 * bidrag_as_ratio / 100)

    const denominator = title.teaching + title.research
    const other_research_upper = Math.min(
        available * (title.research / denominator),
        available * (title.research / denominator) - available * 0.2
    ) / 100
    const teaching_upper = Math.min(
        available * (title.teaching / denominator),
        available * (title.teaching / denominator) - available * title.research
    ) / 100
    const other_research_lower = Math.max(0, title.research - bidrag_as_ratio)

    console.log(available / deltid)
    console.log(title)
    console.log(deltid, bidrag, title.natural_base, available, denominator, other_research_upper, teaching_upper)

    const teaching = Math.max(0.2, teaching_upper)

    const other_research = Math.max(other_research_lower, other_research_upper - teaching)

    console.log(teaching, other_research)

    const basep = Math.round(title['base'] * 10000) / 100
    const teachp = Math.round(teaching * 10000) / 100
    const re_othp = Math.round(other_research * 10000) / 100
    const re_bidrag = Math.round(bidrag_as_ratio * 10000) / 100

    const result = [
        basep,
        teachp,
        re_othp,
        re_bidrag,
    ]

    console.log(result, bidrag)

    // Verification before returning
    const sum_research = re_othp + bidrag_as_ratio
    const required_research = Math.round(title.research * 100)

    const sum = Math.round(result.reduce((a, b) => (a + b), 0) + bidrag)
    // if (sum !== 100) {
    //     throw new Error(`Sum of results is not 100% [${sum}]`)
    // } if (teachp < 20) {
    //     throw new Error(`Teaching is below 20% [${teachp}]`)
    // } if (required_research > sum_research) {
    //     throw new Error(`Research [${sum_research}] is below its required [${required_research}]%`)
    // }


    return result
}
