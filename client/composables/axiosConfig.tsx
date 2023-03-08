import axios from "axios";

// setting { withCredentials: true } allows to send cookies,
// but that needs the server to set {Access-Control-Allow-Credentials: true}
// setting withCredentials here sends cookies without extra config
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
