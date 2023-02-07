import { defineField, defineType } from "sanity";


export default defineType({
    name: 'carts',
    type: 'document',
    title: 'Carts',
    fields: [
        defineField({
            name: 'cart',
            title: 'Cart',
            type: 'array',

            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'product',
                        title: 'Product',
                        type: 'reference',
                        to: [{ type: 'products' }],

                    }),
                    defineField({
                        name: 'quantity',
                        title: 'Quantity',
                        type: 'number',
                    }),
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
            ],
        }),
    ],
    preview: {
        select: {
            id: '_id',
            type: '_type',
        },
        prepare(selection) {
            const { id } = selection
            return { title: `Cart ${id} ` }
        }
    },

})