import { defineField, defineType } from "sanity"

export default defineType({
    name:'contact',
    type:'document',
    title:'Contact requests',
    fields:[
       defineField( {
            name:'name',
            type:'string',
            title:'Username'
        }),
        defineField({
            name:'email',
            type:'string',
            title:'Email'
        }),
        defineField({
            name:'phone',
            type:'string',
            title:'Phone'
        }),
        defineField({
            name:'subject',
            type:'string',
            title:'Subject'
        }),
        defineField({
            name:'message',
            type:'text',
            title:'Message'
        })

    ]
})