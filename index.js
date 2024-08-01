const express = require("express")
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { checkForAuthentication } = require("./middleware/authentication");
const Blog = require("./models/blog");

const app = express();
const PORT = 8000;

async function connectToMongoDB() {
    try {
        await mongoose.connect("mongodb+srv://tradahenish94:a3BojmwOZUMvrMtE@cluster0.cwq6g6v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToMongoDB();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication("token"));
app.use(express.static(path.resolve("./public")))

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    return res.render("home", {user : req.user, blogs : allBlogs});
})

app.listen(PORT , () => console.log(`Server started at PORT : ${PORT}`));


