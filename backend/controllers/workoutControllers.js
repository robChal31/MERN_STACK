const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

const getWorkout = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json("Invalid id");
  }
  try {
    const workout = await Workout.findById(id);
    return res.status(200).json(workout);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const addWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.create({
      title,
      reps,
      load,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json("Gagal menambahkan");
  }
};

const editWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).send("Invalid id");
  }

  try {
    const editWorkoutData = await Workout.findByIdAndUpdate(
      { _id: id },
      {
        title,
        load,
        reps,
      },
      { new: true }
    );
    res.status(200).json(editWorkoutData);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteWorkoutData = await Workout.findByIdAndRemove(id);
    res.status(200).json({
      data: deleteWorkoutData,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      mssg: error,
    });
  }
};

module.exports = {
  addWorkout,
  getWorkout,
  getSingleWorkout,
  deleteWorkout,
  editWorkout,
};
