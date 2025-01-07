import express from "express";
const router = express.Router();
import {
  bookRoute,
  booksRoute,
  categoryRoute,
  createBook,
  getAllRentalsRoute,
  moveToRentedRoute,
  requestedBooksRoute,
  requestRoute,
  returnedStatChange,
} from "../controller/bookController.js";

router.get("/", booksRoute);
router.get("/:id", bookRoute);
router.get("/all/:type", categoryRoute);
router.post("/create", createBook); 
router.post("/request", requestRoute); 
router.get("/request/all", requestedBooksRoute);
router.get("/rentals/all", getAllRentalsRoute); 
router.post("/request/one", moveToRentedRoute); 
router.put("/returned/update", returnedStatChange); 

export default router;
