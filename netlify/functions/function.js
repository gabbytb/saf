// netlify/functions/my-function.js
exports.handler = async (event, context) => {

    // const apiKey = process.env.MY_API_KEY;
    
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*', // Allow all origins
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        // body: JSON.stringify({ message: `Hello from Netlify Function! \nYour API Key: ${apiKey}` }),
        body: JSON.stringify({ message: 'Hello from Netlify Function!' }),
    };

};
