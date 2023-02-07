import client from "../utils/sanity";

export default defineEventHandler(async () => {

    const query = `*[_type == "services"] {name,description,"photoUrl":photo.asset->url}`;
    const data = await client.fetch(query);
    return {
        api: data
    }

})