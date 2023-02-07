import { MagicUserMetadata } from "@magic-sdk/admin";
import client from "../utils/sanity";

export default defineEventHandler(async (event) => {

  const params = { email: (event.context.user as MagicUserMetadata).email };
  const query = `*[_type == "users" && email==$email]{cart->{cart[]{quantity,_key,product->{"photoUrl":photo.asset->url,price,name,_id}},total,_id}}`;
  const data = await client.fetch(query,params);

  return {
    api: data[0].cart
  }

})