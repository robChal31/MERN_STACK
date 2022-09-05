import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const workoutsData = await fetch(`http://localhost:4000/api/workout`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await workoutsData.json();
      dispatch({ type: "SET_WORKOUT", payload: data });
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="flex py-8 gap-6">
      <div className="md:basis-9/12 lg:md:basis-9/12 basis-1">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        {workouts ? (
          <div className="grid grid-cols-2 gap-3 my-6">
            {workouts.map((workout) => {
              return <WorkoutDetails data={workout} key={workout._id} />;
            })}
          </div>
        ) : (
          <div>
            <p>Workout kosong</p>
          </div>
        )}
      </div>
      <div className="border-l-2 border-white py-10 px-10 h-screen">
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
