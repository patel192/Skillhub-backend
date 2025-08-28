const route = require("express").Router()
const PostController = require("../controllers/PostController")
route.post("/post",PostController.AddPost)
route.get("/posts",PostController.GetPost)
route.post("/post/:id/like",PostController.PostLike)
route.post("/post/:id/comment",PostController.PostComment)
route.get("/post/:id/comments",PostController.GetCommentsForPost)
module.exports = route;