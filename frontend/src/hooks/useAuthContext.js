import { useContext } from "react";
import { AuthContext } from "../Context/UserContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("Auth context should be inside authcontextprovider");
  }
  return context;
};
