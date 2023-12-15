// user model using mysql
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db-connect");
require("dotenv").config();
//

// check if user exists
const userExists = async (email) => {
  console.log("userExists", email);
  try {
    const sql = "SELECT * FROM User WHERE userEmail = ?";
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
      "INSERT INTO User (userEmail, userPassword, userName) VALUES (?, ?, ?)";
    const params = [email, password, username];

    const result = await db.query(sql, params);
    console.log("Insert successful. Inserted ID:", result.insertId);
    // const token = require("crypto").randomBytes(64).toString("hex");
    const token = generateToken(result.insertId);
    console.log("token", token);
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
    const sql = "SELECT * FROM User WHERE userEmail = ?";
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
      if (!isPasswordCorrect) {
        return false;
      }

      const token = generateToken(user.userID);
      return {
        id: user.userID,
        email,
        token,
      };
    }
    return false;
  } catch (err) {
    throw err;
  }
};

function generateToken(userId) {
  const payload = { id: userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
}

module.exports = { register, login, userExists };
