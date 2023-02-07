import { MagicUserMetadata } from "@magic-sdk/admin";
import sum from "../utils/cartTotal";
import client from "../utils/sanity";

export default defineEventHandler(async (event) => {
  const params = { email: (event.context.user as MagicUserMetadata).email };
  const query = `*[_type == "users" && email==$email] {firstname,lastname,email,city,street,zipcode,phone}`;
  const data = await client.fetch(query, params);
  const cartQuery = `*[_type == "users" && email==$email]{cart->{cart[]{_key,quantity,product->{name,photo,price,description}},total}}`;

  const userCart = await client.fetch(cartQuery, params);
  const cartTotal = userCart[0].cart ? sum(userCart[0].cart.cart) : 0;
  return {
    api: [...data, { cartTotal }],
  }

})