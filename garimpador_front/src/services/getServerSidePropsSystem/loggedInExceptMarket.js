import apiHelpers from "../apiHelpers";
import { NAME_COOKIES_USER_TOKEN } from "src/config/constant";
import { parseCookies } from "nookies";

export default async function loggedInExceptMarket(ctx, destination = '/404', permanent = false) {
  try {
    const cookies = parseCookies(ctx);

    if (!cookies[NAME_COOKIES_USER_TOKEN]) {
      throw new Error('UNAUTHORIZED USER');
    }

    const response = await apiHelpers.get('/', { headers: { authtoken: cookies[NAME_COOKIES_USER_TOKEN] } });
    if (response.data.registerDB.type === "M") {
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
