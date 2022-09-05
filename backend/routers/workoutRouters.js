const express = require("express");
const {
  addWorkout,
  getWorkout,
  getSingleWorkout,
  deleteWorkout,
  editWorkout,
} = require("../controllers/workoutControllers");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

//auth
router.use(requireAuth);

//get all workouts
router.get("/", getWorkout);

//get single workout
router.get("/:id", getSingleWorkout);

//post workout
router.post("/", addWorkout);

//edit workout
router.put("/:id", editWorkout);

//delete workout
router.delete("/:id", deleteWorkout);

module.exports = router;
