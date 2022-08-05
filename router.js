const Router = require("express");
const router = new Router();
const controller = require("./controller");

router.post("/login", controller.login);
router.get("/get-users", controller.getUsers);
router.post("/send-message", controller.sendMessage);
router.get("/messages/:reciever", controller.messages);
router.get("/usernames", controller.getUsernames);


module.exports = router;
