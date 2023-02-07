import { MagicUserMetadata } from "@magic-sdk/admin";
import sum from "../utils/cartTotal";
import client from "../utils/sanity";

interface Body {
    shipping: number
}

export default defineEventHandler(async (event) => {

    const params = { email: (event.context.user as MagicUserMetadata).email };
    const body: Body = await readBody(event);
    const query = `*[_type == "users" && email==$email]{cart->{cart[]{_key,quantity,product->{name,photo,price,description}},total,_id}}`;
    const data = await client.fetch(query, params);

    if (data[0].cart === null) {
        return { error: 'Your cart is empty. Put something in your cart first.' }
    }
    const total = sum(data[0].cart.cart) + body.shipping;

    const doc = {
        _type: 'orders',
        order: data[0].cart.cart,
        total
    }
    
    const order = await client.create(doc);
    const getUserId = await client.fetch(`*[_type == "users" && email==$email]{_id}`, params);
    await client.patch(getUserId[0]._id).append('orders', [{ _ref: order._id, _type: 'reference' }]).commit({ autoGenerateArrayKeys: true });
    await client.patch(getUserId[0]._id).unset(['cart']).commit(); //remove cart reference from the user
    await client.delete(data[0].cart._id); //delete the cart document

    return {
        message: 'Success'
    }
})