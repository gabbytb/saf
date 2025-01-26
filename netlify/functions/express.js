const express = require('express');
const { Handler } = require('@netlify/functions');


const app = express();


app.get('/', (req, res) => {
    res.send('Hello from Express on Netlify!');
});


const handler = (event, context) => {
    return new Promise((resolve, reject) => {
        app.handle(event, context, (err, response) => {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            };
        });
    });
};

exports.handler = handler;
