import express from "express";
import {
  deleteUser,
  getBookInHand,
  getUser,
  getUsers,
  loginRoute,
  registerRoute,

} from "../controller/userController.js";

const router = express.Router();

router.post("/register", registerRoute);
router.post("/login", loginRoute);
router.get("/:id", getUser);
router.get("/", getUsers);

router.delete("/delete/:id", deleteUser);
router.get("/get/bookinhand/:id", getBookInHand);

export default router;