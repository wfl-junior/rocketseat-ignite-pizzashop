import axios from "axios";
import { env } from "~/env";
import { sleep } from "~/utils/sleep";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async config => {
    await sleep(1000);
    return config;
  });
}
