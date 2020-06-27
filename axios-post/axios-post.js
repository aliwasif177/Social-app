import axios from "axios";
const instance = axios.create({
  baseURL: "https://socialapp-6449c.firebaseio.com/",
});

export default instance;
