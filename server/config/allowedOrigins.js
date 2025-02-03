const allowedOrigins = [    
    // "https://localhost:3000",  // Allow local React app
    "https://192.168.204.113:3000",  // Allow local network access if needed
    "https://saf-ea7m.onrender.com", // Allow production frontend on Render / Allow the frontend domain    

    // 'http://localhost:3000',
    // 'https://www.dandrepairshop.com',
    // 'https://dandrepairshop.com'
];

module.exports = allowedOrigins;