export default function minPartTime(title, hours) {
    // Calculates the minimum allowed part time based
    // on the number of hours, fixed-portion oof other-time
    // relative portion of teaching and research

    const fixed_other = Math.round(title.base * hours)

    const min_hrs = fixed_other / (1 - 0.2 - title.research)

    const min_percent = min_hrs * 100 / hours

    return Math.ceil(min_percent)

}
