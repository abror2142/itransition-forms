export const ALLOWED_QUESTION_TYPES = [
    {id: 1, name: "Multiple Choice"},
    {id: 2, name: "Checkbox"},
    {id: 3, name: "Paragraph"},
    {id: 4, name: "Text"},
    {id: 5, name: "Integer"},
]

export const ALLOWED_FORM_TYPES: {[key: string]: string} = {
    PV: "Private",
    PT: "Protected",
    PUB: "Public"
}