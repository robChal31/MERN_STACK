import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutDetails = (props) => {
  const { dispatch } = useWorkoutContext();
  const { title, reps, load, _id } = props.data;
  const { user } = useAuthContext();

  const deleteWorkout = async (id) => {
    if (!user) {
      return;
    }
    const response = await fetch(`http://localhost:4000/api/workout/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    // const json = await response.json();
    if (!response.ok) {
      alert("Failed to delete");
    }
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: id });
    }
  };
  return (
    <div className="p-2 border-2 border-stone-400 rounded-md bg-white flex flex-row justify-between">
      <div className="">
        <p className="font-medium text-md">Title : {title}</p>
        <p className="text-sm font-normal">Load: {load}</p>
        <p className="text-sm font-normal">Reps : {reps}</p>
      </div>
      <div onClick={() => deleteWorkout(_id)}>
        <p className="p-2 bg-red-600 rounded-md text-white text-xs cursor-pointer">
          delete
        </p>
      </div>
    </div>
  );
};

export default WorkoutDetails;
