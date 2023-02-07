import { defineType, defineField} from "sanity";

export default defineType({
    name: 'orders',
    type: 'document',
    title: 'Orders',
    fields: [
        defineField({
            name: 'order',
            title: 'Order',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'product',
                        title: 'Product',
                        type: 'products',

                    }),
                    defineField({
                        name: 'quantity',
                        title: 'Quantity',
                        type: 'number'
                    })
                ],
                preview: {
                    select: {
                        title: 'product.name',
                        quantity:'quantity',
                    
                    }, 
                    prepare(selection){
                        const {title,quantity} = selection;
                        return {title:`${title} - ${quantity}`}
                    }
                },
            },


            ]
        }),
        defineField({
            name: 'total',
            title: 'Order sum',
            type: 'number',
        })
    ],
    preview: {
        select: {
            id: '_id',
            type: '_type',
        },
        prepare(selection) {
            const { id } = selection
            return { title: `Order ${id} ` }
        }
    },
})