import axios from "axios";
import { ProductType } from "../types/product";

const BASE_URL = "http://localhost:4000";

export const getAll = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/rest/products`);
    return response.data;
  } catch (error) {
    console.log(`Error fetching data`, error);
  }
};

export const getOne = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/rest/products/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getKeys = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/rest/products/keys`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const insertProduct = async (newProduct: ProductType) => {
  const existingProduct = await getOne(newProduct.productId);
  try {
    if (existingProduct.length > 0) {
      // returns an empty array if an ID doesn't exist
      throw new Error("Product ID already exists");
    }
    else if (!newProduct.productId) {
      throw new Error("Bad product ID")
    }
    await axios.post(`${BASE_URL}/rest/products`, newProduct);
    console.log("Succesfully posted:", newProduct.name);
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (
  updatedProduct: ProductType,
  productId: number
) => {
  try {
    await axios.put(`${BASE_URL}/rest/products/${productId}`, updatedProduct);
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    const existingProduct = await getOne(productId);
    if (existingProduct.length === 0) {
      throw new Error(`No match found with id ${productId}`);
    } else {
      await axios.delete(`${BASE_URL}/rest/products/${productId}`);
    }
  } catch (error) {
    throw error;
  }
};
