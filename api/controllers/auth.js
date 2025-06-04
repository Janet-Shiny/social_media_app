import {db} from '../connect.js'
import bcrypt from 'bcryptjs'
export const register=(req,res)=>{
    //check user exist
    const q="select * from users where username=?"
    db.query(q,[req.body.username],(err,data)=>{
       if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("user already exist ")
        //new user

     //hash password
     const salt=bcrypt.genSaltSync(10);
     const hashpass=bcrypt.hashSync(req.body.password,salt)
     const q="insert Into users(`username`,`email`,`password`,`name`)values (?)"
     const value=[req.body.username,req.body.email,hashpass,req.body.name]
     db.query(q,[value],(err,data)=>{
        if(err) return res.status(500).json(err)
            return res.status(200).json("user created")
     })
    })

}
export const login=(req,res)=>{}
export const logout=(req,res)=>{}