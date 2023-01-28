import { parseCookies } from "nookies";
import { NAME_COOKIES_USER_TOKEN } from "src/config/constant";
import apiHelpers from "../apiHelpers";

export default async function loggedInOnlyRoot(ctx, destination = '/404', permanent = false) {
  try {
    const cookies = parseCookies(ctx);

    if (!cookies[NAME_COOKIES_USER_TOKEN]) {
      throw new Error('UNAUTHORIZED USER');
    }

    const response = await apiHelpers.get('/', { headers: { authtoken: cookies[NAME_COOKIES_USER_TOKEN] } });
    if (!response.data.registerDB.isRoot) {
      throw new Error('UNAUTHORIZED USER');
    }

    return {
      props: {}
    }

  } catch (error) {
    return {
      redirect: {
        destination,
        permanent,
      }
    }
  }
}
