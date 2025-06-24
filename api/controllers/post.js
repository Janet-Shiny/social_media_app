import { db } from '../connect.js';
import jwt from "jsonwebtoken";
import moment from 'moment/moment.js';

export const getpost = (req, res) => {
  const token = req.cookies.accesstoken; 
  console.log(token, "token received");
  if (!token) return res.status(401).json("not logged in");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =`
      SELECT p.*, u.id as userid, username, profile_pic
      FROM posts AS p
      JOIN users AS u ON (u.id = p.userid)
      LEFT JOIN relationships AS r ON (p.userid = r.followed_userid)
      WHERE r.follower_userid = ? OR p.userid = ? order by p.created_at desc `;
    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
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
    const q ="insert into posts (`desc`,`img`,`userid`,`created_at`) values (?)";
    const values=[ req.body.desc,req.body.img,userInfo.id,moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")]
    db.query(q, [values], (err, data) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json(err);
      }
      return res.status(200).json("post has been created");
    });
  });
};
