import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
    name:'users',
    type:'document',
    title:'Users',
    fields:[
        defineField({
            name:'firstname',
            type:'string',
            title:'First name'
        }),
        defineField({
            name:'lastname',
            type:'string',
            title:'Last name'
        }),
        defineField({
            name:'email',
            type:'string',
            title:'Email address'
        }),
        defineField({
            name:'city',
            type:'string',
            title:'City'
        }),
        defineField({
            name:'street',
            type:'string',
            title:'Street'
        }),
        defineField({
            name:'zipcode',
            type:'string',
            title:'Zip code'
        }),
        defineField({
            name:'phone',
            type:'string',
            title:'Phone'
        }),
        defineField({
            name: 'orders',
            title: 'Orders',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: [{ type: 'orders' }]
                })
            ]
        }),
        defineField({
            name:'cart',
            title:'Cart',
            type:'reference',
            to:[{type:'carts'}]
        })
    ]
})