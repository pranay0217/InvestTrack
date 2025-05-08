const sinon = require('sinon');



const config = {
    api_key: "user_api_key",
    client_code: "user01",
    jwttoken: "jwt-token",
    default_login_uri :"https://smartapi.angelone.in/publisher-login",
    requestInstance: {
        request: sinon.stub(),
        interceptors: {
            request: {
                use: sinon.stub(),
            },
            response: {
                use: sinon.stub(),
            },
        },
        defaults: {
            headers: {
                post: {
                    'Content-Type': 'application/json',
                },
                put: {
                    'Content-Type': 'application/json',
                },
            },
        }
    }
};


module.exports = config;