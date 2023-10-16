import { createContext, useContext, useState } from "react";
import { registerRequest } from '../api/user.js';
import Cookies from 'js-cookie';


const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useAuth must be used within an UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setIsAuthenticated(true)
            setUsers(res.data);

        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const logout = (() => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null)
    })

    return (
        <UserContext.Provider
            value={{
                signup,
                users,
                errors,
                isAuthenticated,
                logout
            }}
        > {children}
        </UserContext.Provider>
    );
};




