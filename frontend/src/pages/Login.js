import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useLogin();

  const loginHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex my-16 items-center flex-col h-screen">
      <h1 className="font-semibold text-2xl">Sign In</h1>

      <form className="w-1/2 my-8" onSubmit={loginHandler}>
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
        <button
          className="bg-green-400 w-full text-white font-semibold py-2 my-4 rounded-md"
          disabled={loading}
        >
          Sign in
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
