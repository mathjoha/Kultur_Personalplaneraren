export default function divideHours(title, bidrag) {

    const bidrag_as_ratio = (bidrag / 100)
    const available = 1 - title['base']
    const unused = available - bidrag_as_ratio

    const denominator = title.teaching + title.research
    const other_research_upper = (title.research / denominator) * unused
    const teaching_upper = (title.teaching / denominator) * unused

    const teaching = Math.max(0.2, teaching_upper)
    const other_research = other_research_upper - Math.max(0, 0.2 - teaching_upper)



    const basep = Math.round(title['base'] * 10000) / 100
    const teachp = Math.round(teaching * 10000) / 100
    const re_othp = Math.round(other_research * 10000) / 100

    const result = [
        basep,
        teachp,
        re_othp,
    ]

    // Verification before returning
    const sum_research = re_othp + bidrag
    const required_research = Math.round(title.research * 100)

    const sum = Math.round(result.reduce((a, b) => (a + b), 0) + bidrag)
    if (sum !== 100) {
        throw new Error(`Sum of results is not 100% [${sum}]`)
    } if (teachp < 20) {
        throw new Error(`Teaching is below 20% [${teachp}]`)
    } if (required_research > sum_research) {
        throw new Error(`Research [${sum_research}] is below its required [${required_research}]%`)
    }


    return result
}
