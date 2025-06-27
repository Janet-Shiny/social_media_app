import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getRelationships = (req, res) => {
  const q = "SELECT followed_userid FROM relationships WHERE follower_userid = ?";
  db.query(q, [req.query.follower_userid], (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json(err);
    }
    return res.status(200).json(data.map(relationship => relationship.followed_userid));
  });
};

export const addRelationship = (req, res) => {
  const token = req.cookies.accesstoken;
  console.log(token, "token received");
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q = "INSERT INTO relationships(`follower_userid`,`followed_userid`) VALUES (?)";
    const values = [userInfo.id, req.body.userid];

    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json("Following");
    });
  });
};

export const deleteRelationship = (req, res) => {
  const token = req.cookies.accesstoken;
  console.log(token, "token received");
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "DELETE FROM relationships WHERE follower_userid = ? AND followed_userid = ?";
    db.query(q, [userInfo.id, req.query.userid], (err, data) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json(err);
      }
      return res.status(200).json("Unfollow ");
    });
  });
};
