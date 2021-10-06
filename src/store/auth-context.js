import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLogedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token'); // WE INITIAL THE TOKEN VALUE TO CHECK IF WE ALREADY HAVE ONE OR NOT IT WILL WORK BECAUSE LOCALSTORAGE (SYNCRONECE)
  const [token, setToken] = useState(initialToken);

  const userIsLogedIn = !!token;

  const logInHandeler = (token) => {
    setToken(token);
    localStorage.setItem('token', token); // We SAVE THE TOKEN IN THE LOCALSTORAGE TO PREVENT LOSING IT IN THE RELOAD
  };
  const logOutHandeler = () => {
    setToken(null);
    localStorage.removeItem('token'); // WHEN WE PRESS LOGOUT WE REMOVE THAT SAVED TOKEN TO START NEW
  };

  const contextValue = {
    token: token,
    isLogedIn: userIsLogedIn,
    login: logInHandeler,
    logout: logOutHandeler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
