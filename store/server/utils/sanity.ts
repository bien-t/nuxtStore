import sanityClient from "@sanity/client"

const config = useRuntimeConfig();

const client = sanityClient({
  projectId: config.public.sanity.projectId,
  dataset: config.public.sanity.dataset,
  withCredentials: config.public.sanity.withCredentials,
  apiVersion: config.public.sanity.apiVersion,
  token:config.API_WRITETOKEN,
  useCdn: config.public.sanity.useCdn,
})
export default client


