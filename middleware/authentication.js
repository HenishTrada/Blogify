const { validateToken } = require("../service/authentication");

function checkForAuthentication(cookie){
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookie];
        if(!tokenCookieValue){
            return next();
        }

        try {
            const userPayLoad = validateToken(tokenCookieValue);
            req.user = userPayLoad;

        } catch (error) {        }
        return next();
    }
}

module.exports = {checkForAuthentication}   