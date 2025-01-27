// netlify/functions/my-function.js
exports.handler = async (event, context) => {
    const apiKey = process.env.MY_API_KEY;
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Hello from Netlify Function! \nYour API Key: ${apiKey}` }),
        // body: JSON.stringify({ message: 'Hello from Netlify Function!' }),
    };
};
