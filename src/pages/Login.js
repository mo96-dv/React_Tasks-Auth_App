import React from 'react';
import Auth from '../components/authentication/Auth';

const Login = () => {
  return (
    <div>
      <p
        style={{
          textAlign: 'center',
          color: 'gray',
          fontSize: '25px',
          margin: '25px',
        }}
      >
        Welcome To Task Manager
      </p>
      <Auth />
    </div>
  );
};

export default Login;
