import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    if (!email || !password) {
      setError("All field must be filled");
    }
    if (email && password) {
      setError("");
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (response.ok) {
        setLoading(false);
        dispatch({ type: "LOGIN", payload: json });
        localStorage.setItem("user", JSON.stringify(json));
      }
      if (!response.ok) {
        console.log(json);
        setError(json);
        setLoading(false);
      }
    }
  };

  return { login, error, loading };
};
