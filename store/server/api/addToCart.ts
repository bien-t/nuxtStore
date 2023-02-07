import { MagicUserMetadata } from "@magic-sdk/admin";
import client from "../utils/sanity";

interface CartItem {
  product: {
    _ref: string
  }
}
interface Body {
  productId: string
}

export default defineEventHandler(async (event) => {

  const params = { email: (event.context.user as MagicUserMetadata).email };
  const body: Body = await readBody(event);
  //check if the user cart exists
  const cartQuery = `*[_type == "users" && email==$email]{cart->{cart[],_id}}`;
  const userCart = await client.fetch(cartQuery, params);
  //if not, create a new one
  if (userCart[0].cart === null) {
    const document = {
      _type: 'carts',
      cart: [],
    };
    const cartDocument = await client.create(document);
    const updatedCart = await client.patch(cartDocument._id).append('cart', [{ quantity: 1, product: { _type: 'reference', _ref: body.productId } }]).commit({ autoGenerateArrayKeys: true });
    const getUserId = await client.fetch(`*[_type == "users" && email==$email]{_id}`, params);
    await client.patch(getUserId[0]._id).set({ 'cart': { _ref: updatedCart._id, _type: 'reference' } }).commit();
  } else {
    //otherwise, update the existing cart
    const filteredProducts = userCart[0].cart.cart.filter((cartItem: CartItem) => {
      return cartItem.product._ref === body.productId;
    })

    //if the item is currently in the cart, update the quantity
    if (filteredProducts.length > 0) {
      const updateQuery = { [`cart[_key=="${filteredProducts[0]._key}"].quantity`]: filteredProducts[0].quantity + 1 };
      await client.patch(userCart[0].cart._id).set(updateQuery).commit();
    } else {
      //if not, append a new item  
      await client.patch(userCart[0].cart._id).append('cart', [{ quantity: 1, product: { _type: 'reference', _ref: body.productId } }]).commit({ autoGenerateArrayKeys: true });
    }
  }

  return {
    api: 'Success'
  }

})