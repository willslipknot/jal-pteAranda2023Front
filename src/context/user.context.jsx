import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, getUserRequest, updateUserRequest } from '../api/user.js';
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
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    

    const signup = async (user) => {
        try {
          const res = await registerRequest(user);
          console.log(res.data);
          setIsAuthenticated(true);
          setUser(res.data);
          localStorage.setItem('userId', res.data.userId); 
        } catch (error) {
          setErrors(error.response.data);
        }
      };

      const logout = () => {
        Cookies.remove("token");
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
        setUsers(null);
      };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
            setUsers(res.data);
            setIsAuthenticated(true)

        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data])
        }
    }

    const getUser= async() => {
        try {
            const res =await getUserRequest();
            return res.data

        } catch (error) {
            console.error(error)
        }
    }

    const updateUser = async (id, updatedField) => {
        try {
          const res = await updateUserRequest(id, { voto: updatedField });
          if (res.status === 200) {
            setActs((prevUsers) => {
              return prevUsers.map((prevUser) => {
                if (prevUser.id === id) {
                  return { ...prevUser, voto: updatedField };
                }
                return prevUser;
              });
            });
          }
          console.log(res);
        } catch (error) {
          console.error('Error al actualizar el campo específico:', error);
        }
      };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])
    
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(cookies.token)
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                console.log(res.data)
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);


    return (
        <UserContext.Provider
            value={{
                signup,
                users,
                errors,
                isAuthenticated,
                logout,
                signin,
                user,
                loading,
                getUser,
                updateUser,
            }}
        > {children}
        </UserContext.Provider>
    );
};




