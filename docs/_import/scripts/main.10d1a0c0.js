export default function divideHours(title, bidrag, part) {

    const title_percent = title.natural_base + title.research + title.teaching

    if (title_percent != 1) {
        throw new Error('title_percent != 1')
    }

    const deltid = part == undefined ? 100 : part

    var bidrag_as_ratio = Math.min(bidrag / deltid, 1 - title.base - 0.2)
    const available = deltid - (bidrag_as_ratio + title.natural_base) * 100

    const denominator = title.teaching + title.research

    // adjusting the shares of teaching and research
    const research_share_adjusted = title.research / denominator
    const teaching_share_adjusted = title.teaching / denominator

    // applying the new shares to calculate their new % of total time
    let teaching_prelim = (1 - bidrag_as_ratio - title.base) * teaching_share_adjusted
    let research_prelim = (1 - bidrag_as_ratio - title.base) * research_share_adjusted


    var missed_teaching = 0
    if (teaching_prelim < 0.2) {
        teaching_prelim = 0.2
        research_prelim = (1 - bidrag_as_ratio - title.base - 0.2)
    }

    var missed_research = 0
    if ((research_prelim + bidrag_as_ratio) < title.research) {
        missed_research = (research_prelim + bidrag_as_ratio) - title.research
        research_prelim = title.research - bidrag_as_ratio
        teaching_prelim = 1 - title.base - title.research
    }

    if (research_prelim < 0 & teaching_prelim < 0) {
        throw new Error(`${research_prelim} && ${teaching_prelim}]%`)

    }


    const research_share = research_prelim
    if (research_prelim < 0) {
        bidrag_as_ratio += missed_research
        research_prelim = 0
    }
    const teaching_share = teaching_prelim

    const basep = Math.round(title['base'] * 10000) / 100
    const teachp = Math.round(teaching_share * 10000) / 100
    const re_othp = Math.round(research_share * 10000) / 100
    const re_bidrag = Math.round(bidrag_as_ratio * 10000) / 100

    const result = [
        basep,
        teachp,
        re_othp,
        re_bidrag,
    ]


    // Verification before returning
    const sum_research = re_othp + re_bidrag
    const required_research = Math.round(title.research * 100)

    const sum = Math.round(result.reduce((a, b) => (a + b), 0))
    if (sum !== 100) {
        throw new Error(`Sum of results[${result}] is not 100% [${sum}]`)
    } if (teachp < 20) {
        throw new Error(`Teaching is below 20% [${teachp}]`)
    } if (required_research > sum_research) {
        throw new Error(`Research [${sum_research}] is below its required [${required_research}]%`)
    } if (re_othp < 0) {
        throw new Error(`Other Research [${re_othp}] is below its required [0]%`)
    }

    return result
}
