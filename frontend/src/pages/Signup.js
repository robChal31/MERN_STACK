import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [user, dispatch] = useAuthContext();
  const [error, setError] = useState("");

  const signupHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All field must be filled");
    }

    if (email && password) {
      const sendData = async () => {
        const response = await fetch("http://localhost:4000/api/user/signup", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const json = await response.json();

        if (response.ok) {
          setError("");
          setEmail("");
          setPassword("");
          console.log(json);
          navigate("/login");
        }

        if (!response.ok) {
          setError(json);
        }
      };
      sendData();
    }
  };

  return (
    <div className="flex my-16 items-center flex-col h-screen">
      <h1 className="font-semibold text-2xl">Sign up</h1>

      <form className="w-1/2 my-8" onSubmit={signupHandler}>
        <div className="flex flex-col">
          <label>E-mail</label>
          <input
            type="text"
            value={email}
            className="py-2 my-1  px-4 rounded-md outline-none"
            placeholder="e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="text"
            value={password}
            className="py-2 my-1  px-4 rounded-md outline-none"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-green-400 w-full text-white font-semibold py-2 my-4 rounded-md">
          Sign up
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
