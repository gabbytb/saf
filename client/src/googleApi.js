// TITLE: SETUP AXIOS
// Create a new file to set up Axios. 
// This file will be like your helper’s official guide on how to behave. 
// googleApi.js
import axios from 'axios';

// Create an instance of Axios with default settings
const googleApi = axios.create({
    baseURL: "https://www.googleapis.com", // This is your server’s base URL
    // timeout: 3000, // Optional: Maximum time to wait for a response
});

export default googleApi;