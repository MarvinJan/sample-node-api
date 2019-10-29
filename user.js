const express = require("express");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

const serverError = {
  code: "SERVER_ERROR",
  description: "something went wrong, Please try again"
};

const getUsers = async (req, res) => {
  try {
    let users = await readFile("./db.json");

    if (users.length > 0) {
      return res.status(200).json({
        message: "users fetched successfully",
        data: JSON.parse(users)
      });
    }

    return res.status(404).json({
      code: "BAD_REQUEST_ERROR",
      description: "No users found in the system"
    });
  } catch (error) {
    return res.status(500).json(serverError);
  }
};

const getUserById = async (req, res) => {
  try {
    let users = await readFile("./db.json");
    users = JSON.parse(users);

    let user = users.find(user => user.id === +req.params.id);

    if (!!user) {
      return res.status(200).json({
        message: "user fetched successfully",
        data: user
      });
    }

    return res.status(404).json({
      code: "BAD_REQUEST_ERROR",
      description: "No users found in the system"
    });
  } catch (error) {
    return res.status(500).json(serverError);
  }
};
const addUser = async (req, res) => {
  try {
    const { name, login } = req.body;

    if (!name)
      return res.status(422).json({
        code: "REQUIRED_FIELD_MISSING",
        description: "name is required",
        field: "name"
      });

    if (!login) {
      return res.status(422).json({
        code: "REQUIRED_FIELD_MISSING",
        description: "login is required",
        field: "login"
      });
    }

    let users = await readFile("./db.json");
    users = JSON.parse(users);
    usersLastId = users[users.length - 1].id;
    users.push({ name, login, id: +usersLastId + 1 });
    fs.writeFileSync("./db.json", JSON.stringify(users));

    return res
      .status(200)
      .json({ message: "User added:", id: +usersLastId + 1 });
  } catch (error) {
    return res.status(500).json(serverError);
  }
};
const modifyUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, login } = req.body;

    let users = await readFile("./db.json");
    users = JSON.parse(users);
    userToModify = users.find(user => user.id === +id);

    if (!!userToModify) {
      let changesMade = false;

      const changeField = (field, newValue) => {
        if (userToModify[field] === newValue) return;
        userToModify[field] = newValue;
        if (!changesMade) changesMade = true;
      };

      if (!!name) changeField("name", name);
      if (!!login) changeField("Login", login);

      console.log(users);

      if (!!changesMade) {
        fs.writeFileSync("./db.json", JSON.stringify(users));

        return res
          .status(200)
          .json({ message: "User changed", modifiedUserId: userToModify.id });
      }
      return res
        .status(200)
        .json({ message: "User found, no chages were made" });
    }
    return res.status(404).json({
      code: "BAD_REQUEST_ERROR",
      description: "No such user found in the system"
    });
  } catch (error) {
    return res.status(500).json(serverError);
  }
};

module.exports = {
  getUsers: getUsers,
  getUserById: getUserById,
  addUser: addUser,
  modifyUser: modifyUser
};
