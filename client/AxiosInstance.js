import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e270-2402-800-6215-af8e-a45d-d7bd-dc54-2e92.ap.ngrok.io",
})

export default axiosInstance