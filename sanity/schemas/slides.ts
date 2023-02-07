import { defineField, defineType } from "sanity"

export default defineType({
    name: 'slides',
    type: 'document',
    title: 'Slides',
    fields: [
                defineField({
                    name: 'title',
                    title: 'Image title',
                    type: 'string',
                }),
                defineField({
                    name: 'image',
                    title: 'Image',
                    type: 'image'
                })
]

})