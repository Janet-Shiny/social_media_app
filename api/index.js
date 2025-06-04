import express from 'express';
const app=express()
import userRoutes from './Routes/users.js'
import authRoutes from './Routes/auth.js'
import postRoutes from './Routes/posts.js'
import likeRoutes from './Routes/likes.js'
import commentRoutes from './Routes/comments.js'
app.use(express.json())
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/likes",likeRoutes)
app.use("/api/comments",commentRoutes)
app.listen(8800,()=>{
    console.log("Api ");
})