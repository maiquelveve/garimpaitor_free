import { parseCookies } from "nookies";
import { NAME_COOKIES_USER_TOKEN } from "src/config/constant";

export default function notInLogged(ctx, destination = '/404', permanent = false) {
  try {
    const cookies = parseCookies(ctx);

    if (cookies[NAME_COOKIES_USER_TOKEN]) {
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
