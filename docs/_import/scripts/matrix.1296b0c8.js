
export default function buildData(basep, teachp, re_othp, bidrag) {
    return [
        { 'name': '1. Övrig tid ', 'percent': basep },
        { 'name': '2. Undervisning', 'percent': teachp },
        { 'name': '3. Forskning - Fakultet*', 'percent': re_othp },
        { 'name': '4. Forskning - Bidrag', 'percent': bidrag },
    ]
}
