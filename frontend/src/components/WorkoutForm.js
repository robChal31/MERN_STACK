import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState(0);
  const [reps, setReps] = useState(0);
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  const submit = async (e) => {
    e.preventDefault();
    if (title && load && reps) {
      const response = await fetch(`http://localhost:4000/api/workout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, load, reps }),
      });

      if (!response.ok) {
        setError(response.statusText);
      }
      if (response.ok) {
        const data = await response.json();
        setTitle("");
        setLoad(0);
        setReps(0);
        setError("");
        dispatch({ type: "ADD_WORKOUT", payload: data });
      }
    }
  };

  return (
    <form className="w-full" onSubmit={submit}>
      <div className="flex flex-col">
        <label htmlFor="">Title</label>
        <input
          type="text"
          className="
          w-80 my-2 border border-white outline-0  px-4 py-2 rounded-md "
          value={title}
          onChange={(e) =>
            setTitle(() => {
              return e.target.value;
            })
          }
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="">Load</label>
        <input
          className="
          w-80 my-2 border border-white outline-0  px-4 py-2 rounded-md "
          value={load}
          onChange={(e) =>
            setLoad(() => {
              return e.target.value;
            })
          }
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="">Reps</label>
        <input
          className="
          w-80 my-2 border border-white outline-0  px-4 py-2 rounded-md "
          value={reps}
          onChange={(e) =>
            setReps(() => {
              return e.target.value;
            })
          }
        />
      </div>
      <button className="w-80 py-2 bg-green-400 text-white font-semibold rounded-md my-4">
        Buat
      </button>
      {error && (
        <div>
          <p className="text-red-400 text-center">{error}</p>
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;
