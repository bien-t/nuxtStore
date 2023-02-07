import { MagicUserMetadata } from "@magic-sdk/admin";
import client from "../utils/sanity";

interface Body {
    productKey:string
    cartId:string
}

export default defineEventHandler(async (event) => {

    const params = { email: (event.context.user as MagicUserMetadata).email };
    const body:Body = await readBody(event);
    const productToRemove = [`cart[_key=="${body.productKey}"]`];
    await client.patch(body.cartId).unset(productToRemove).commit();


    const query = `*[_type == "users" && email==$email]{cart->{cart[]{quantity,_key,product->{"photoUrl":photo.asset->url,price,name}},total,_id}}`;
    const data = await client.fetch(query, params);
    return {
        api: data[0].cart
    }

})