import { db } from '../connect.js';
import jwt from "jsonwebtoken";

export const getuser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id = ?";
  
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");

    const { password, ...info } = data[0];
    return res.status(200).json(info);
  });
};

export const searchUsers = (req, res) => {
  const searchTerm = req.query.q;
  
  if (!searchTerm) return res.status(400).json("Search term is required");
  
  const q = "SELECT id, username, profile_pic FROM users WHERE username LIKE ? LIMIT 10";
  const searchPattern = `%${searchTerm}%`;
  
  db.query(q, [searchPattern], (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};

export const updateuser = (req, res) => {
  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "UPDATE users SET `username`=?, `cit`=?, `website`=?, `profile_pic`=? WHERE id=?";
    
    db.query(q, [
      req.body.username,
      req.body.cit,
      req.body.website,
      req.body.profile_pic,
      userInfo.id
    ], (err, data) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json(err);
      }
      if (data.affectedRows > 0) {
        return res.json("Updated!");
      }
      return res.status(403).json("You can update only your profile!");
    });
  });
};
