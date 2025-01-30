// netlify/functions/my-function.js
exports.handler = async (event, context) => {
    
    try {

        // Optionally read an API key from environment variables
        // const apiKey = process.env.MY_API_KEY;

        // Check HTTP method (e.g., allow only GET requests)
        if (event.httpMethod !== 'GET') {
            return {
                statusCode: 405, // Method Not Allowed
                headers: {
                    'Access-Control-Allow-Origin': '*', 
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
                body: JSON.stringify({ message: 'Method Not Allowed' }),
            };
        }

        // Successful response
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
            body: JSON.stringify({ message: 'Hello from Netlify Function!' }),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
        };
    };

};
