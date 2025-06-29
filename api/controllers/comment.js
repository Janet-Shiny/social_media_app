import {db} from "../connect.js"
import jwt from "jsonwebtoken"
import moment from "moment/moment.js";
export const getComments=(req,res)=>{
        const q =`
          SELECT c.*, u.id as userid, username, profile_pic
          FROM comments AS c
          JOIN users AS u ON (u.id = c.commentsuserid) 
          where c.postid=?
          order by c.created_at desc `;
        db.query(q, [req.query.postid], (err, data) => {
          if (err) {
            return res.status(500).json(err);
          }
          return res.status(200).json(data);
        });
}

export const addComment = (req, res) => {
  const token = req.cookies.accesstoken; 
  console.log(token, "token received");
  if (!token) return res.status(401).json("not logged in");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q ="insert into comments(`desc`,`created_at`,`commentsuserid`,`postid`) values (?)";
    const values=[ req.body.desc,moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),userInfo.id,req.body.postid]
    db.query(q, [values], (err, data) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json(err);
      }
      return res.status(200).json("Comment has been created");
    });
  });
};
