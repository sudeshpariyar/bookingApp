import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//Update
router.put("/:id", verifyUser, updateUser);

//Delete
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GETALL
router.get("/", verifyAdmin, getUsers);

export default router;

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("You are authenticated.");
// });

// router.get("/checkauthentication/:id", verifyUser, (req, res, next) => {
//   res.send("You are authenticated and can delete or update.");
// });

// router.get("/checkauthentication/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello Admin. You can delete or update all accounts.");
// });
