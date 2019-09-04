import axios from "axios";

const instance = axios.create({
  baseURL: `https://b2c-requestchecker.herokuapp.com/`
  // baseURL: `http://localhost/`
});

export default instance;
