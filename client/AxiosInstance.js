import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://411a-2402-800-6215-af8e-c0b3-d42d-9bdf-5e2c.ap.ngrok.io",
})

export default axiosInstance