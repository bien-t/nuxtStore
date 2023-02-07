import client from "../utils/sanity";

export default defineEventHandler(async () => {

  const query = `*[_type == "slides"]{title,image{asset->{_id,url,metadata{dimensions{height,width}}}}}`;
  const data = await client.fetch(query);
  return {
    api: data
  }

})