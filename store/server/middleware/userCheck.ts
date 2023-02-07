import { Magic } from "@magic-sdk/admin";

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  try {
    const clientSideRoutes = !event.node.req.url?.startsWith('/api');
    if (clientSideRoutes) {
      return
    } else if (event.node.req.url === '/api/contact' || event.node.req.url === '/api/getProducts' || event.node.req.url === '/api/getServices' || event.node.req.url === '/api/createUser' || event.node.req.url === '/api/getSlides' || event.node.req.url === '/api/getProduct') {
      return
    } else if (!event.node.req.headers.authorization) {
      sendError(event, new Error('Not allowed'))
    } else {

      //  Uncomment the following lines to use the Magic site for user authentication
      // const mAdmin = new Magic(config.MAGIC_SECRET_KEY);
      // const headers = getRequestHeaders(event);
      // const DIDToken = mAdmin.utils.parseAuthorizationHeader(headers.authorization ?? '');
      // mAdmin.token.validate(DIDToken)
      // const metadata = await mAdmin.users.getMetadataByToken(DIDToken);
      // event.context.user = metadata;

      //Comment out the below line to use the Magic site for user authentication.
      event.context.user = { email: "test+success@magic.link", phoneNumber: null }
    }
  } catch (error) {
    sendError(event, new Error('Not allowed'))

  }
})