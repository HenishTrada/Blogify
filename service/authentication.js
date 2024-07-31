const jwt = require("jsonwebtoken");
const secretKey = "Blogify@Trada2004";

function createTokenForUser(user){
    const payLoad = {
        _id : user._id,
        fullName : user.fullName,
        email : user.email,
        profileImage : user.profileImage,
        role : user.role,
    }

    const token = jwt.sign(payLoad, secretKey);
    return token;
}

function validateToken(token){
    const payLoad =  jwt.verify(token, secretKey);
    return payLoad;
};

module.exports= {
    createTokenForUser,
    validateToken
}