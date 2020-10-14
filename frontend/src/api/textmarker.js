import axios from "axios";

export default axios.create({
  baseURL: "https://braguinski.de",
  timeout: 10000,
});
