const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    content : {
        type: String,
        required : true
    },
    blogId : {
        type : String,
        ref : "blog"
    },
    createdBy : {
        type: String,
        ref : "user"
    },
}, {timestamps : true});

const Comment = mongoose.model("comment",commentSchema);

module.exports = Comment;