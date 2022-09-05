import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const logoutHandler = () => {
    logout();
  };

  return (
    <header className="bg-white h-24 w-screen">
      <div className="mx-36 flex h-full items-center justify-between">
        <Link to={"/"} className="text-2xl font-semibold">
          <h1>Workoutbuddy</h1>
        </Link>
        <div className="flex flex-row gap-5">
          {user && (
            <>
              <p className="p-2">{user.user.email}</p>
              <button
                className="p-2 border border-green-400 rounded-md"
                onClick={logoutHandler}
              >
                logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link to={"/login"} className="text-md font-semibold">
                <h1>Login</h1>
              </Link>
              <Link to={"/signup"} className="text-md font-semibold">
                <h1>Register</h1>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
