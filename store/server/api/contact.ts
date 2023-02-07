import client from "../utils/sanity";

interface Body {
    formData: {
        _type:string
        username: string
        email: string
        phone: string
        message: string
        subject: string
    }
}


export default defineEventHandler(async (event) => {

    const body: Body = await readBody(event)
    type ObjectKey = keyof typeof body.formData;

    let emptyFields = [];
    for (const field in body.formData) {

        if (body.formData[field as ObjectKey] === '') {
            emptyFields.push(field);
        }
    }
    if (emptyFields.length > 0) {
        return {
            api: 'Error',
        }
    }
    const doc = {
        _type: 'contact',
        name: body.formData.username,
        email: body.formData.email,
        phone: body.formData.phone,
        message: body.formData.message,
        subject: body.formData.subject

    }
    await client.create(doc);

    return {
        api: 'Success'
    }

})