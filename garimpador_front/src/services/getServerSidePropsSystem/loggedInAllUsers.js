import { parseCookies } from "nookies";
import { NAME_COOKIES_USER_TOKEN } from "src/config/constant";

export default function loggedInAllUsers(ctx, destination = '/404', permanent = false) {
  const cookies = parseCookies(ctx);

  if (!cookies[NAME_COOKIES_USER_TOKEN]) {
    return {
      redirect: {
        destination,
        permanent,
      }
    }
  }

  return {
    props: {}
  }
}
