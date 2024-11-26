export default function updateBase(title, hours, part) {

    const part_time = part == undefined | part == null ? 100 : part

    const fixed_other = Math.round(title.base * hours)

    const efffective_hours = hours * part_time / 100

    const effective_other_percent = fixed_other / efffective_hours

    const as_ratio = Math.ceil(effective_other_percent * 10000) / 10000

    const updated_title = {
        base: as_ratio,
        teaching: title.teaching,
        research: title.research,
        natural_base: title.base
    }
    return updated_title
}
