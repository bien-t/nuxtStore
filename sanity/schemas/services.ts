import { defineField, defineType } from "sanity"

export default defineType({
    name:'services',
    type:'document',
    title:'Services',
    fields:[
       defineField( {
            name:'name',
            type:'string',
            title:'Service name'
        }),
        defineField({
            name:'description',
            type:'text',
            title:'Service description'
        }),
        defineField({
            name:'photo',
            type:'image',
            title:'Photo'
        })
    ]
})