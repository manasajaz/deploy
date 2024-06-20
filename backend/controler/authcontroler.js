const SendResponse = require("../helper/helper");
const UserModel = require("../model/authmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthControler = {
  signup: async (req, res) => {
    try {
      let { userName, passward } = req.body;
      let obj = { userName, passward };
      let errorArray = [];

      if (!obj.userName) {
        errorArray.push("userName required");
      }

      if (!obj.passward) {
        errorArray.push("passward required");
      }

      if (errorArray.length > 0) {
        res
          .status(400)
          .send(SendResponse(false, "validation error", errorArray));
        return;
      }

      let userExist = await UserModel.findOne({
        userName: obj.userName,
      });

      if (userExist) {
        res.status(400).send(SendResponse(false, "user already exist"));
        return;
      } else {
        obj.passward = await bcrypt.hash(obj.passward, 10);

        let User = new UserModel(obj);
        let result = await User.save();

        if (result) {
          res
            .status(200)
            .send(SendResponse(true, "user create successfully", result));
        }
      }
    } catch (err) {
      res.status(500).send(SendResponse(false, "internael server error", err));
    }
  },

  login: async (req, res) => {
    try {
      let { userName, passward } = req.body;
      // console.log(req.body);
      let obj = { userName, passward };

      let existingUser = await UserModel.findOne({
        userName: obj.userName,
      });

      if (existingUser) {
        let CorrectPasword = await bcrypt.compare(
          obj.passward,
          existingUser.passward
        );

        if (CorrectPasword) {
          let token = jwt.sign({ ...existingUser }, process.env.SECRET_KEY);

          res.send(
            SendResponse(true, "Login Successfully", {
              token: token,
              user: existingUser,
            })
          );
        } else {
          res.send(SendResponse(false, "Password Not Match"));
        }
      } else {
        res.send(SendResponse(false, "User Not Found with this User Name"));
      }
    } catch (err) {
      res.status(500).send(SendResponse(false, "internael server error", err));
    }
  },

  del: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await UserModel.findByIdAndDelete(id);

      if (result) {
        res
          .status(200)
          .send(SendResponse(true, "user deleted successfully", result));
      } else {
        res.status(400).send(SendResponse(true, "no data found", null));
      }
    } catch (err) {
      res.status(500).send(SendResponse(false, "internal server error", err));
    }
  },

  get: async (req, res) => {
    try {
      let users = await UserModel.find({});
      if (users.length > 0) {
        res.status(200).send(SendResponse(true, "all Users retrieved successfully", users));
      } else {
        res.status(400).send(SendResponse(false, "No users found", null));
      }
    } catch (err) {
      res.status(500).send(SendResponse(false, "internal server error", err));
    }
  },

  getbyid: async (req, res) => {
    try {
      let id = req.params.id;
      let user = await UserModel.findById(id);
      if (user) {
        res.status(200).send(SendResponse(true, "single User retrieved successfully", user));
      } else {
        res.status(400).send(SendResponse(false, "No user found with this ID", null));
      }
    } catch (err) {
      res.status(500).send(SendResponse(false, "internal server error", err));
    }
  },

  edit: async (req, res) => {
    try {
      let id = req.params.id;
      let { userName, passward } = req.body;

      let updateData = {};
      if (userName) updateData.userName = userName;
      if (passward) updateData.passward = await bcrypt.hash(passward, 10);
      // if (contact) updateData.contact = contact;

      let updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });

      if (updatedUser) {
        res.status(200).send(SendResponse(true, "User updated successfully", updatedUser));
      } else {
        res.status(400).send(SendResponse(false, "No user found with this ID", null));
      }
    } catch (err) {
      res.status(500).send(SendResponse(false, "internal server error", err));
    }
  },


  protected: (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).send(SendResponse(false, "un Authorized"));
      return;
    } else {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401).send(SendResponse(false, "un Authorized"));
        } else {
          next();
          return;
        }
      });
    }
  },

  adminProtected: async (req, res, next) => {
    // 'Bearer jdflsdlfsjhlkdfjslkdfjhshfdkjshfdkjshdfkshdfkj'
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).send(SendResponse(false, "Un Authorized"));
      return;
    } else {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401).send(SendResponse(false, "Un Authorized"));
          return;
        } else {
          if (decoded._doc.role == "admin") {
            next();
            return;
          }
        }
      });
    }
  },
};

module.exports = AuthControler;
