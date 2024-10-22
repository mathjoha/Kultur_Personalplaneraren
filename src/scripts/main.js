
function divideHours(title, hrs, bidrag) {
    const granted_hours = title['base'] * hrs
    const remaining = hrs * (1 - title['base'])
    const financed = bidrag / 100

    const used = financed + title['base']

    const research_reserve = title['base'] == 0.05 ? 0.05 : 0
    const unused = 1 - used - research_reserve


    const teaching = Math.min(
        Math.max(0.2, unused * title['teaching']),
        1 - title['base'] - title['dev'] - title['research'])
    const other_research = unused - teaching + research_reserve
    const all_research = other_research + financed

    const teachp = Math.round(teaching * 100)
    const basep = Math.round(title['base'] * 100)
    const re_allp = Math.round(all_research * 100)
    const re_finp = Math.round(financed * 100)
    const re_othp = Math.round(other_research * 100)

    const re_allt = Math.round(all_research * hrs)

    return [
        basep,
        teachp,
        re_othp,
    ]
}
