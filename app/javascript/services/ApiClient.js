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
  resetPassword: async (resetPasswordBody) => {
    try {
      let token = localStorage.getItem("jwt");
      const response = await apiInstance.patch(
        "/auth/reset-password",
        resetPasswordBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      token = response?.data?.token || null;
      if (token) {
        localStorage.setItem("jwt", token);
      } else {
        console.error("Reset Password response does not contain a valid token");
      }
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
  fetchEbooks: async ({ tags, seller_id }) => {
    try {
      console.log("FetchEbooks Request:", tags, seller_id);

      const token = localStorage.getItem("jwt");

      const query = new URLSearchParams();
      if (tags && tags.length) query.append("tags", JSON.stringify(tags));
      if (seller_id) query.append("seller_id", seller_id);

      console.log("Query ->?", query.toString());

      const response = await apiInstance.get(`/ebooks?${query.toString()}`, {
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
  fetchEbooksTags: async () => {
    try {
      console.log("FetchEbooksTags Request");
      const token = localStorage.getItem("jwt");

      const response = await apiInstance.get("/tags", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetch ebooks tags with success");
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
