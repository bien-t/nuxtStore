import { MagicUserMetadata } from "@magic-sdk/admin";
import client from "../utils/sanity";

interface Body {
    userData: {
        firstname: string
        lastname: string,
        email: string,
        city: string,
        street: string,
        zipcode: string,
        phone: string,
    }
}

export default defineEventHandler(async (event) => {

    const body: Body = await readBody(event);
    type ObjectKey = keyof typeof body.userData;

    const userEmail = { email: (event.context.user as MagicUserMetadata).email };
    let params = {};
    for (const field in body.userData) {
        if (body.userData[field as ObjectKey]) {
            params = { ...params, [field]: body.userData[field as ObjectKey] };
        }
    }
    const getUserId = `*[_type == "users" && email==$email] {_id}`;
    const data = await client.fetch(getUserId, userEmail);
    const updatedUser = await client.patch(data[0]._id).set((params)).commit();
    return {
        api: [{
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email,
            city: updatedUser.city,
            street: updatedUser.street,
            zipcode: updatedUser.zipcode,
            phone: updatedUser.phone,

        }]
    }

})