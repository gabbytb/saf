// TITLE: SETUP AXIOS
// Create a new file to set up Axios. 
// This file will be like your helper’s official guide on how to behave. 
// Name this file api.js or axiosConfig.js.

// api.js
import axios from 'axios';


// Create an instance of Axios with default settings
const api = axios.create({
    // baseURL: "https://0404-102-88-109-204.ngrok-free.app",
    baseURL: "https://localhost:8000",   // This is your server’s base URL
    // baseURL: "https://192.168.234.113:8000",   // This is your server’s base URL
    // baseURL: "https://samuelakinolafoundation.netlify.app",     // This is your server’s base URL
    timeout: 20000, // Optional: Maximum time to wait for a response
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

export default api;