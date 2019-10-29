const router = require("express").Router();

const users = require("./user");

router.get("/user", users.getUsers);
router.get("/user/:id", users.getUserById);
router.post("/user", users.addUser);
router.put("/user/:id", users.modifyUser);

module.exports = router;
