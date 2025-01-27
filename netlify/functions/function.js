// netlify/functions/my-function.js
exports.handler = async (event, context) => {

    // const apiKey = process.env.MY_API_KEY;
    
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*', // Allow all origins (or replace '*' with your frontend domain)
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ message: `Hello from Netlify Function! \nYour API Key: ${apiKey}` }),
        body: JSON.stringify({ message: 'Hello from Netlify Function!' }),
    };

};
