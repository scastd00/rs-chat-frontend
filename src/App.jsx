import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import PublicRoute from './routes/PublicRoute';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme as dark, lightTheme as light } from './themes';
import ToolBar from './layouts/ToolBar';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import { ADMINISTRATION_ROUTES, PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes/allRoutes';

function App(props) {
  // Theme detector -> https://medium.com/hypersphere-codes/detecting-system-theme-in-javascript-css-react-f6b961916d48
  const [darkTheme, setDarkTheme] = useState(props.theme.isDarkTheme);

  useEffect(() => {
    // If darkTheme parameter is changed, every change
    // made to code is reflected in UI when saved.
    setDarkTheme(props.theme.isDarkTheme);
  }, [props.theme.isDarkTheme]);

  return (
    <ThemeProvider theme={darkTheme ? dark : light}>
      <div className='App'>
        <Router>
          <ToolBar />

          <Routes>
            {/* Go to log in by default if the user is not logged in */}
            <Route path='/' element={<Navigate to='/login' />} />

            {
              PUBLIC_ROUTES.map(({ path, component, restricted }, index) => (
                <Route key={index}
                       path={path}
                       element={<PublicRoute component={component} restricted={restricted} />} />
              ))
            }

            {
              PRIVATE_ROUTES.map(({ path, component }, index) => (
                <Route key={index} path={path} element={<PrivateRoute component={component} />} />
              ))
            }

            {
              ADMINISTRATION_ROUTES.map(({ path, component }, index) => (
                <Route key={index} path={path} element={<AdminRoute component={component} />} />
              ))
            }
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

/*
 Solved 404 response when accessing Vercel from other page:
 https://t3.gg/blog/post/vite-vercel
 */

/*
 For more info see the following video
 https://www.youtube.com/watch?v=gFZiQnM3Is4
 */

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(App);
