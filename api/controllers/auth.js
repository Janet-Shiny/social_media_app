import { db } from '../connect.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
  // Check if user exists
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserQuery, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const profilePic = req.file?.filename || null;

    const insertUserQuery = `
      INSERT INTO users
      (username, email, password, name, profile_pic, cit, website)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
      profilePic,
      req.body.cit,      // ✅ should match input name in frontend
      req.body.website
    ];

    db.query(insertUserQuery, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User created successfully");
    });
  });
};

export const login = (req, res) => {
  const loginQuery = "SELECT * FROM users WHERE username = ?";
  db.query(loginQuery, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
    if (!isPasswordCorrect) return res.status(400).json("Wrong password or username");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...userWithoutPassword } = data[0];
    res
      .cookie("accesstoken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax"
      })
      .status(200)
      .json(userWithoutPassword);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accesstoken", {
      secure: true,
      sameSite: "none"
    })
    .status(200)
    .json("User has been logged out");
};
