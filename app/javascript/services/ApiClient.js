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
      const response = await apiInstance.post("/auth/login", loginBody);
      const token = response?.data?.token || null;
      if (token) {
        localStorage.setItem("jwt", token);
      } else {
        console.error("Login response does not contain a valid token");
      }
      return response?.data;
    } catch (err) {
      throw err;
    }
  },

  fetchEbooks: async () => {
    try {
      console.log("FetchEbooks Request");
      const token = localStorage.getItem("jwt");

      const response = await apiInstance.get("/ebooks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetch books with sucess");
      return response?.data;
    } catch (err) {
      throw err;
    }
  },

  placeOrder: async ({ buyerId, ebooksIds }) => {
    try {
      const token = localStorage.getItem("jwt");

      const response = await apiInstance.post(
        "/purchase",
        {
          buyer_id: buyerId,
          ebooks_ids: ebooksIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
  purchaseEbooks: async () => {
    try {
      const token = localStorage.getItem("jwt");

      const response = await apiInstance.get("/purchases", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response?.data;
    } catch (err) {
      throw err;
    }
  },
  updateUser: async (avatarFile) => {
    try {
      const token = localStorage.getItem("jwt");
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;

      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const response = await apiInstance.patch(`/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};
export default ApiClient;
