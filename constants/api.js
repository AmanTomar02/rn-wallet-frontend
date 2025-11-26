// export const API_URL = "https://wallet-api-v2r2.onrender.com";
import Constants from "expo-constants";
console.log("API_URL: in api.js ..➡️➡️➡️➡️", API_URL);

export const API_URL = Constants.expoConfig.extra.API_URL;
