import Axios from "axios";

let refresh = false;

Axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response.status === 401 && !refresh) {
      refresh = true;
      const response = await Axios.post("/api/refresh", {}, { withCredentials: true });

      if (response.status === 200) {
        Axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;

        return Axios(err.config);
      }
    }

    refresh = false;
    return err;
  }
);
