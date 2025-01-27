const handler = async (event, context) => {
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
