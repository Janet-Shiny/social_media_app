import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getlikes = (req, res) => {
  const q = "SELECT userid FROM likes WHERE postid = ?";
  db.query(q, [req.query.postid], (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json(err);
    }
    return res.status(200).json(data.map(like => like.userid));
  });
};

export const addlike = (req, res) => {
  const token = req.cookies.accesstoken;
  console.log(token, "token received");
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "INSERT INTO likes(`userid`, `postid`) VALUES (?)";
    const values = [userInfo.id, req.body.postid];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json(err);
      }
      return res.status(200).json("Post has been liked");
    });
  });
};

export const deletelike = (req, res) => {
  const token = req.cookies.accesstoken;
  console.log(token, "token received");
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "DELETE FROM likes WHERE userid = ? AND postid = ?";
    db.query(q, [userInfo.id, req.query.postid], (err, data) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json(err);
      }
      return res.status(200).json("Post has been disliked");
    });
  });
};
