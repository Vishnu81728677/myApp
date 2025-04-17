// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

export const getProducts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  try {
    const response = await axios.get(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/search?q=${query}`);
    return response.data.products;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};