const express=require("express");
const router=express.Router();
const { signUp, signIn, getList, getOne, deleteUser, current, partialUpdate } = require("../controllers/UserController");

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/current", current);
router.get("/:id", getOne);
router.delete("/:id", deleteUser);
router.patch("/:id", partialUpdate);
router.get("/", getList);

module.exports = router;
