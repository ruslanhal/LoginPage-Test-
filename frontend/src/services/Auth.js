import axios from 'axios';

const BASE_URL = 'https://fastapi-demo-server.azurewebsites.net';

export const signUp = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/sign-up`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/reset-password`, { email });
    return response.data;
  } catch (error) {
    console.error('Error during password reset request:', error);
    throw error;
  }
};

export const confirmPasswordReset = async (token, new_password) => {
  try {
    const response = await axios.post(`${BASE_URL}/reset-password/confirm`, {
      token,
      new_password,
    });
    return response.data;
  } catch (error) {
    console.error('Error during password reset confirmation:', error);
    throw error;
  }
};
