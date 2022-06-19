import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://662a-123-20-11-108.ap.ngrok.io",
})

export default axiosInstance