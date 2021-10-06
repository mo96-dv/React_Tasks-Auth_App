import React, { useState, useRef, useContext } from 'react';
import classes from './Auth.module.css';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  // to output our Values In the Input Fields...
  const emailRef = useRef();
  const passwordRef = useRef();

  // To toggle between (LOGIN && Sign UP)
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandeler = (e) => {
    e.preventDefault();

    setIsLoading(true);

    // Handling The Fetching Progress

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    // SETTING THE LOGIN & SIGN UP POSTING REQUESTS WITH A DIFFRENT URL'S

    let url;
    const signUpUrl =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcKcoWoh0SZEY8r9GsL9x-lYW7PRNAuo8';
    const signInUrl =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcKcoWoh0SZEY8r9GsL9x-lYW7PRNAuo8';

    if (isLogin) {
      url = signInUrl;
    } else {
      url = signUpUrl;
    }
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          authCtx.login(data.idToken);
          history.replace('/Task');
        });
      } else {
        return res
          .json()
          .then((data) => {
            let errorMessage = data.error.message;
            throw new Error(errorMessage);
          })
          .catch((error) => {
            setError(error.message);
          });
      }
    });
    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandeler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailRef} type='email' id='email' />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordRef} type='password' id='password' />
        </div>
        {error && (
          <div style={{ border: '3px solid darkred', marginTop: '20px' }}>
            <p
              style={{
                color: 'darkred',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              {error}
            </p>
          </div>
        )}
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending Request....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Auth;
