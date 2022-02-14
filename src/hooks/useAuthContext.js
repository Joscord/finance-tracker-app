import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const authContext = useContext(AuthContext);
    // Hacemos un checkeo por si no tenemos el contexto. Básicamente si no tiene un valor es porque estamos fuera del scope del proveedor   
    if (!authContext) {
        throw new Error('useAuthContext must be inside an AuthContextProvider');
    }
    return authContext
}

