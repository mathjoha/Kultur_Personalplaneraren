export default function divideHours(title, bidrag) {
    const financed = bidrag / 100

    const used = financed + title['base']

    const research_reserve = title['base'] == 0.05 ? 0.05 : 0
    const unused = 1 - used - research_reserve


    const teaching = Math.max(0.2,
        Math.min(
            Math.max(0.2, unused * title['teaching']),
            1 - title['base'] - title['dev'] - title['research'])
    )
    const other_research = unused - teaching + research_reserve

    const teachp = Math.round(teaching * 10000) / 100
    const basep = Math.round(title['base'] * 10000) / 100
    const re_othp = Math.round(other_research * 10000) / 100


    return [
        basep,
        teachp,
        re_othp,
    ]
}
