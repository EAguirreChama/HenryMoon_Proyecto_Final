import axios from "axios";

const countries = axios.create({
  baseURL: "https://countriesback-production-11ed.up.railway.app",
});

export default countries;