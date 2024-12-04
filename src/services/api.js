import axios from "axios";

const API_BASE_URL = "https://localhost:8000";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    credentials: 'include',
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const getProducts = async () => {
    const response = await axiosInstance.get("/products");
    return response.data;
};

export const getCategories = async () => {
    const response = await axiosInstance.get("/categories");
    return response.data;
};


export const addProduct = async (product) => {
    const response = await axiosInstance.post("/products", product);
    return response.data;
};

export const updateProductApi = async (product) => {
    const response = await axiosInstance.put(`/products/${product.id}`, product);
    return response.data;
};

export const deleteProductApi = async (id) => {
    await axiosInstance.delete(`/products/${id}`);
};


export const addCategory = async (category) => {
    const response = await axiosInstance.post("/categories", category);
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
};
