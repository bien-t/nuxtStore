import client from "../utils/sanity";

interface Body {
    productKey: string
    quantity: number
    cartId: string
}

export default defineEventHandler(async (event) => {

    const body: Body = await readBody(event);
    const updateQuery = { [`cart[_key=="${body.productKey}"].quantity`]: body.quantity };
    await client.patch(body.cartId).set(updateQuery).commit();


    return {
        api: 'Success'
    }

})