const allowedOrigins = [
    "https://samuelakinolafoundation.netlify.app", // Allow production frontend on Netlify / Allow the frontend domain    
    // "https://localhost:3000",  // Allow local React app
    // "https://192.168.40.113:3000",  // Allow local network access if needed
];

module.exports = allowedOrigins;