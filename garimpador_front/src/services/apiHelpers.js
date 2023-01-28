import axios from "axios";
import { API_HELPERS_URL, TOKEN_API_HELPERS } from "src/config/constant";

const apiHelpers = axios.create({
  baseURL: API_HELPERS_URL,
  headers: {
    authsystemtoken: TOKEN_API_HELPERS
  }
});

export default apiHelpers;
