import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://5b19-123-20-11-108.ap.ngrok.io",
})

export default axiosInstance