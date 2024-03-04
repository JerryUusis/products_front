import axios from "axios";

const BASE_URL = 'http://localhost:4000';

export const getAll = async () =>  {
    try {
        const response = await axios.get(`${BASE_URL}/rest/products`);
        return response.data;
    }
    catch(error) {
        console.log(`Error fetching data`, error)
    }
}

export const getOne = async (id: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/rest/products/${id}`);
        return response.data;
    }
    catch(error) {
        console.log(error)
    }
}

export const getKeys = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/rest/products/keys`);
        return response.data
    }
    catch(error) {
        console.log(error)
    }
}