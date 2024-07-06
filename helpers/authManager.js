require("dotenv").config();
const jwt = require('jsonwebtoken');

// Middleware for JWT Auth
const authCheckCredentials = async (ctx, next) => {
    
    console.log("authCheckCredentials Started");
    let isSecure = process.env["SECURE"];

    // if NOT secure, we allow everything
    if (isSecure == "false") {
        console.log("not secure, skipping authorization");
        await next();
        return;
    }

    if (ctx.header.authorization == undefined) {
        console.log("headers authorization not found!");
        ctx.status = 401;
        ctx.body = 'Auth headers not found';
        return;
    }

    try {
        console.log("headers authorization: " + JSON.stringify(ctx.header.authorization));
        const token = ctx.header.authorization;
        console.log("jwt.verify Started: " + token);
        const decoded = jwt.verify(token, process.env["KOA_AUTH_SECRET"]);
        console.log("jwt.verify Finised");
        console.log("decoded: " + JSON.stringify(decoded));
        ctx.state.user = decoded;
        await next();
    } catch (err) {
        console.log("ERROR " + err);
        ctx.status = 401;
        ctx.body = 'Unauthorized';
    }
};


module.exports = { authCheckCredentials }