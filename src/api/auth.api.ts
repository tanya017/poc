import api from "./axios";
import { key } from "../utils/api";

export const preAuth = async () => {
  try {
    await api.post("/v1/api/auth/pre-auth-handshake", key);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/v1/api/auth/login", {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const validateOTP = async (username: string, otp: string) => {
  try {
    const response = await api.post("/v2/api/auth/validate-otp", {
      username: username,
      otp: Number(otp),
    });
    return response.data;
  } catch (error: any) {
    console.error("Server error details: ", error.response?.data);
    return error;
  }
};

export const forgetUserID = async (panNumber: string, emailId: string) => {
  try {
    const response = await api.post("/v1/api/auth/forgot-user-id", {
      panNumber,
      emailId,
    });
    return response.data;
  } catch (error: any) {
    console.error("Server error details: ", error.response?.data);
    throw error;
  }
};


export const forgetPassword = async (panNumber: string, username: string) => {
  try {
    const response = await api.post("/v1/api/auth/forgot-password", {
      panNumber,
      username,
    });
    return response.data;
  } catch (error: any) {
    console.error("Server error details: ", error.response?.data);
    throw error;
  }
};

export const authenticateOtp = async (otp: number, username: string, isUserBlocked: boolean) => {
  try {
    const response = await api.post("/v1/api/auth/authenticate-otp", {
      otp,
      username,
      isUserBlocked,
    });
    return response.data;
  } catch (error: any) {
    console.error("Server error details: ", error.response?.data);
    throw error;
  }
};

export const unblockUser = async (username: string, panNumber: string) => {
  try {
    const response = await api.post("/v1/api/auth/unblock-user", {
      username,
      panNumber,
    });
    return response.data;
  } catch (error: any) {
    console.error("Server error details: ", error.response?.data);
    throw error;
  }
};