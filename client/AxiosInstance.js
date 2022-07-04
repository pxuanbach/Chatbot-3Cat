import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://chatbot-3cat.herokuapp.com/",
})

export default axiosInstance