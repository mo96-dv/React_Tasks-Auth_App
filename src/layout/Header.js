import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import classes from './Header.module.css';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const logOutHandeler = () => {
    authCtx.logout();
    history.replace('/');
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Task Manager</div>
      <nav>
        <ul>
          {!authCtx.isLogedIn && (
            <li>
              <NavLink activeClassName={classes.active} to='/login'>
                Login
              </NavLink>
            </li>
          )}
          {authCtx.isLogedIn && (
            <li>
              <NavLink activeClassName={classes.active} to='/task'>
                Task
              </NavLink>
            </li>
          )}
          {authCtx.isLogedIn && (
            <li>
              <button onClick={logOutHandeler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
