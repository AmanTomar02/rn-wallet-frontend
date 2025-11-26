import Constants from "expo-constants";

export const API_URL =
  Constants?.expoConfig?.extra?.API_URL ||
  "https://rn-wallet-backend-n8z5.onrender.com";

console.log("API_URL:", API_URL);
