import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ffe4-2402-800-6215-af8e-5b0-f5ca-8370-5a0b.ap.ngrok.io",
})

export default axiosInstance