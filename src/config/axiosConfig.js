import axios from "axios";

const intance = axios.create({
  baseURL: "https://fixhealth-serverrework.onrender.com/api", //change  to actual url in production
});

export default intance;
