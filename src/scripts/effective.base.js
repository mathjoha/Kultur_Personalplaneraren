export default function updateBase(title, hours, part_time) {
    const fixed_other = Math.round(title.base * hours)

    const remaining_hours = Math.round(hours * part_time / 100)

    const effective_other_percent = fixed_other / remaining_hours

    const updated_title = {
        research: title.research,
        teaching: title.teaching,
        base: effective_other_percent,
        natural_base: title.base
    }

    return updated_title
}
