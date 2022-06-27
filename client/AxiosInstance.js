import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://defe-123-21-22-229.ap.ngrok.io",
})

export default axiosInstance