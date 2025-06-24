import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
const app=express()
import userRoutes from './Routes/users.js'
import authRoutes from './Routes/auth.js'
import postRoutes from './Routes/posts.js'
import likeRoutes from './Routes/likes.js'
import commentRoutes from './Routes/comments.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next()
})
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/myyapp/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname);
  }
})

const upload = multer({ storage: storage })

app.post("/api/upload",upload.single("file"),(req,res)=>{
    const file=req.file;
    res.status(200).json(file.filename);
})








app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/likes",likeRoutes)
app.use("/api/comments",commentRoutes)
app.listen(8800,()=>{
    console.log("Api ");
})
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}