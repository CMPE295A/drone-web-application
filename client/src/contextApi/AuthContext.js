import { createContext, useState } from "react";

//create new context object for authentication
export const AuthContext = createContext();


// create the component to share states to its children components
export const AuthProvider = ({ children }) => {
    //state that will be shared 
    const [currentUser, setCurrentUser] = useState(sessionStorage.getItem('token') || null);


    const login = async (token) => {
        sessionStorage.setItem("token", token);
        setCurrentUser(token);
        // console.log("context: " + currentUser);
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        setCurrentUser(null);
    };

    // Wrap the AuthProvider children with the context provider 
    // and pass the state as value to all its descendants in the component tree
    return <AuthContext.Provider value={{ currentUser, login, logout }}>
        {children}
    </AuthContext.Provider>;
};
