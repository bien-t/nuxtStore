import { defineField, defineType } from "sanity"

export default defineType({
    name:'products',
    type:'document',
    title:'Products',
    fields:[
       defineField( {
            name:'name',
            type:'string',
            title:'Name'
        }),
        defineField({
            name:'price',
            type:'number',
            title:'Price'
        }),
        defineField({
            name:'description',
            type:'text',
            title:'Description'
        }),
        defineField({
            name:'photo',
            type:'image',
            title:'Photo'
        })
    ]
})