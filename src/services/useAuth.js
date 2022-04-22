import AuthContext from "./auth-context";
import { useContext } from "react";

export const useAuth = () => {
    const value = useContext(AuthContext);

    return value;
}