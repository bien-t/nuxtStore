import client from "../utils/sanity";

export default defineEventHandler(async (event) => {
    const referer = event.node.req.headers.referer?.split('/');
    const pathValue = referer ? referer[referer.length - 1] : '';
    if (pathValue === 'shop') {
        const query = `*[_type == "products"] | order(_createdAt desc) {_id,name,price,"photoUrl":photo.asset->url}`;
        const data = await client.fetch(query);
        return {
            api: data
        }
    } else {
        const query = `*[_type == "products"] | order(_createdAt desc) {_id,name,price,"photoUrl":photo.asset->url}[0..4]`;
        const data = await client.fetch(query);
        return {
            api: data,
        }
    }



})