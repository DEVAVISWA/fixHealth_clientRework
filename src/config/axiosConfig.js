import axios from "axios";

const intance = axios.create({
  baseURL: "http://localhost:3000/api", //change  to actual url in production
});

export default intance;
