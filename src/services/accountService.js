// src/services/accountService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/account'; 

// Fungsi untuk mengambil daftar akun
export const getAccountList = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data.data; // Mengembalikan array account dari respons
  } catch (error) {
    console.error("Error fetching account list:", error);
    throw error;
  }
};
