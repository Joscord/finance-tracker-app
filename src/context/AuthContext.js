import { createContext, useReducer } from "react";

// Estado por defecto/inicial
const defaultState = {
    user: null
}

// Función reductora
export const authReducer = (state, action) => {
    switch(action.type) {
        // Aquí irán los casos, por ahora dejaremos sólo el caso por default
        default: 
            return state;  
    }
}

// Creamos un contexto con la función createContext();
export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    // Invocamos useReducer pasando la función reductora y el estado inicial. Esto nos devuelve el estado y la función para despachar acciones
    const [state, dispatch] = useReducer(authReducer, defaultState);

    return (
    // Usamos la prop value para disponibilizar el estado a un árbol de componentes. Pasamos un objeto con las propiedades de estado (por ahora sólo user) y la función para despachar acciones
    <AuthContext.Provider value={{...state. dispatch}}>
        {children}
    </AuthContext.Provider>
    )
}

