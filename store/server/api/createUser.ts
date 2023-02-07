import client from "../utils/sanity";

interface Body {
    email:string
}


export default defineEventHandler(async (event) => {

    const body:Body = await readBody(event);
    const params = { email: body.email };
    const query = `*[_type == "users" && email==$email]`;
    const checkUser = await client.fetch(query, params);

    if (checkUser.length === 0) {
        const document = {
            _type: 'users',
            email: body.email
        }
        await client.create(document)
    }

    return {
        api: true
    }

})