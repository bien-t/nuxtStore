import client from "../utils/sanity";

interface Body {
    productId: string
}


export default defineEventHandler(async (event) => {
    const body: Body = await readBody(event)
    const params = { productId: body.productId }
    const query = `*[_type == "products" && _id==$productId]{_id,name,price,description,photo{asset->{url,metadata{dimensions{height,width}}}}}`;
    const data = await client.fetch(query, params);
    return {
        api: data
    }




})