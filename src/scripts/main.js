export default function divideHours(title, bidrag) {

    const bidrag_as_ratio = (bidrag / 100)
    const available = 1 - title['base']
    const unused = available - bidrag_as_ratio

    const denominator = title.teaching + title.research
    const other_research_upper = (title.research / denominator) * unused
    const teaching_upper = (title.teaching / denominator) * unused

    const teaching = Math.max(0.2, teaching_upper)
    const other_research = other_research_upper - Math.max(0, 0.2 - teaching_upper)



    const teachp = Math.round(teaching * 10000) / 100
    const basep = Math.round(title['base'] * 10000) / 100
    const re_othp = Math.round(other_research * 10000) / 100


    return [
        basep,
        teachp,
        re_othp,
    ]
}
