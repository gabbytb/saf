// TITLE: SETUP AXIOS
// Create a new file to set up Axios. 
// This file will be like your helper’s official guide on how to behave. 
// Name this file api.js or axiosConfig.js.

// api.js
import axios from "axios";
import axiosRetry from "axios-retry";






// Create an instance of Axios with default settings
const api = axios.create({
                // baseURL: "https://localhost:8000",   // LOCAL Domains:- This is your server’s base URL
                baseURL: "https://192.168.238.113:8000",   // LOCAL Domains:- This is your server’s base URL            
                // baseURL: "https://lovely-pans-drive.loca.lt",   // HTTPS Domains:- This is your server’s base URL
                timeout: 20000, // Optional: Maximum time to wait for a response                
                // withCredentials: true, // If cookies or sessions are needed
                // headers: {
                //   'Content-Type': 'application/json',
                // },
            });

            // Enable retries with axios
            axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
            
export default api;