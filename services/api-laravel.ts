import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getCases = async (params = {}) => {
  try {
    const response = await api.get("/cases", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCaseId = async (id: string) => {
  try {
    const response = await api.get(`/cases/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postNewCase = async (data: any) => {
  try {
    const response = await api.post("/cases", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCaseById = async (id: string, data: any) => {
  try {
    const response = await api.put(`/cases/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toggleActivate = async (id: string) => {
  try {
    const response = await api.patch(`/cases/${id}/toggle`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
