import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://127.0.0.1:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

const ApiClient = {
  fetchUsers: async () => {
    try {
      console.log("FetchUsers Request");
      const response = await apiInstance.get("/users/index");
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
  registerUser: async (registerUserBody) => {
    try {
      console.log("Register User Request: ", registerUserBody);
      const response = await apiInstance.post("/users", registerUserBody);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
  login: async (loginBody) => {
    try {
      const response = await apiInstance.post("/login", loginBody);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },

  fetchEbooks: async () => {
    try {
      console.log("FetchEbooks Request");
      const response = await apiInstance.get("/ebooks");
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
};
export default ApiClient;
