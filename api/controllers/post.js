import { db } from '../connect.js';
import jwt from "jsonwebtoken";
import moment from 'moment/moment.js';

export const getpost = (req, res) => {
  const userid = req.query.userid;
  const token = req.cookies.accesstoken; 
  console.log(token, "token received");
  console.log("userid:", userid);
  
  if (!token) return res.status(401).json("not logged in");
  
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    
    // Check if userid exists and is not "undefined" string
    const hasValidUserId = userid && userid !== "undefined" && userid !== "null";
    
    const q = hasValidUserId ? 
      `SELECT DISTINCT p.id, p.desc, p.img, p.created_at, u.id as userid, u.username, u.profile_pic
       FROM posts AS p
       JOIN users AS u ON (u.id = p.userid) 
       WHERE p.userid = ?
       ORDER BY p.created_at DESC` :
      `SELECT DISTINCT p.id, p.desc, p.img, p.created_at, u.id as userid, u.username, u.profile_pic
       FROM posts AS p
       JOIN users AS u ON (u.id = p.userid)
       WHERE p.userid IN (
         SELECT DISTINCT followed_userid FROM relationships WHERE follower_userid = ?
         UNION
         SELECT ?
       )
       ORDER BY p.created_at DESC`;
       
    const values = hasValidUserId ? [userid] : [userInfo.id, userInfo.id];
    
    console.log("Query:", q);
    console.log("Values:", values);
    
    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json(err);
      }
      return res.status(200).json(data);
    });
  });
};
export const addpost = (req, res) => {
  const token = req.cookies.accesstoken; 
  console.log(token, "token received");
  if (!token) return res.status(401).json("not logged in");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "INSERT INTO posts (`desc`, `img`, `userid`, `created_at`) VALUES (?, ?, ?, ?)";
    const values = [
      req.body.desc,
      req.body.img,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    ];
    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json(err);
      }
      return res.status(200).json("post has been created");
    });
  });
};
