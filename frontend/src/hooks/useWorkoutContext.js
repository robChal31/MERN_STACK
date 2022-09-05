import { useContext } from "react";
import { WorkoutContext } from "../Context/WorkoutContext";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error(
      "useworkoutcontext should be use inside workoutcontextprovider"
    );
  }

  return context;
};
