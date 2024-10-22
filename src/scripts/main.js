export default function divideHours(title, bidrag) {

    const bidrag_as_ratio = (bidrag / 100)
    const available = 1 - title['base']
    const unused = available - bidrag_as_ratio

    const denominator = title.teaching + title.research
    const other_research_upper = (title.research / denominator) * unused
    const other_research_lower = Math.min(0, title.research - bidrag_as_ratio)
    const teaching_upper = unused - other_research_lower

    const teaching = Math.max(0.2, teaching_upper)
    const other_research = Math.max(other_research_lower,
        other_research_upper - teaching)

    const teachp = Math.round(teaching * 10000) / 100
    const basep = Math.round(title['base'] * 10000) / 100
    const re_othp = Math.round(other_research * 10000) / 100


    return [
        basep,
        teachp,
        re_othp,
    ]
}
