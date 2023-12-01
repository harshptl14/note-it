// user model using mysql
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const db = require("./db-connect");
//

// check if user exists
const userExists = async (email) => {
  console.log("userExists", email);
  try {
    const sql = "SELECT * FROM user WHERE userEmail = ?";
    const res = await db.query(sql, [email]);
    console.log("userExists", res);
    if (res.length) {
      console.log("user exists", res[0]);
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
};

// create user
const register = async (email, password, username) => {
  // hash the password
  // const hashedPassword = await bcrypt.hash(password, 10);

  // save the user in the database
  try {
    const sql =
      "INSERT INTO user (userEmail, userPassword, userName) VALUES (?, ?, ?)";
    const params = [email, password, username];

    const result = await db.query(sql, params);
    console.log("Insert successful. Inserted ID:", result.insertId);
    const token = require("crypto").randomBytes(64).toString("hex");
    const finalResponse = {
      token: token,
      ...result,
    };

    return finalResponse;
  } catch (err) {
    console.error("Error inserting user:", err);
    throw err;
  }
};

const login = async (email, password) => {
  try {
    const sql = "SELECT * FROM user WHERE userEmail = ?";
    const res = await db.query(sql, [email]);
    if (res.length) {
      const user = res[0];
      // const isPasswordCorrect = await bcrypt.compare(password, user.password);
      // trim user enterned password for extra white spaces
      const isPasswordCorrect = password === user.userPassword;
      // if (isPasswordCorrect) {
      //   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      //     expiresIn: process.env.JWT_EXPIRES_IN,
      //   });
      //   return token;
      // }
      if (isPasswordCorrect) {
        return true;
      }
    }
    return false;
  } catch (err) {
    throw err;
  }
};

// functions
// userExists
// login
// const { promisify } = require("util");
// const query = promisify(db.query).bind(db);
//
// const User = function (user) {
//   this.email = user.email;
//   this.password = user.password;
// };
//
// User.create = async (newUser, result) => {
//   try {
//     const hashedPassword = await bcrypt.hash(newUser.password, 10);
//     const user = {
//       email: newUser.email,
//       password: hashedPassword,
//     };
//     const sql = "INSERT INTO users SET ?";
//     const res = await query(sql, user);
//     result(null, { id: res.insertId, ...user });
//   } catch (err) {
//     result(err, null);
//   }
// };
//
// User.findByEmail = async (email, result) => {
//   try {
//     const sql = "SELECT * FROM users WHERE email = ?";
//     const res = await query(sql, email);
//     if (res.length) {
//       result(null, res[0]);
//       return;
//     }

//     result({ kind: "not_found" }, null);
//   } catch (err) {
//     result(err, null);
//   }
// };
//
// User.login = async (email, password, result) => {
//   try {
//     const sql = "SELECT * FROM users WHERE email = ?";
//     const res = await query(sql, email);
//     if (res.length) {
//       const user = res[0];
//       const isPasswordCorrect = await bcrypt.compare(password, user.password);
//       if (isPasswordCorrect) {
//         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//           expiresIn: process.env.JWT_EXPIRES_IN,
//         });
//         result(null, token);
//         return;
//       }
//     }
//     result({ kind: "not_found" }, null);
//   } catch (err) {
//     result(err, null);
//   }
// };
//
// User.findById = async (id, result) => {
//   try {
//     const sql = "SELECT * FROM users WHERE id = ?";
//     const res = await query(sql, id);
//     if (res.length) {
//       result(null, res[0]);
//       return;
//     }
//     result({ kind: "not_found" }, null);
//   } catch (err) {
//     result(err, null);
//   }
// };
//
// module.exports = User;
// user model using mongodb
// const mongoose = require("mongoose");
//
// const UserSchema = mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minLength: 6,
//   },
// });
//
module.exports = { register, login, userExists };
