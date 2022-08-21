import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import PublicRoute from './routes/PublicRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme as dark, lightTheme as light } from './themes';
import ToolBar from './layouts/ToolBar';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import AdminRoute from './routes/AdminRoute';
import Administration from './pages/Administration';

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
            <Route path='/login' element={<PublicRoute component={Login} restricted />} />
            <Route path='/register' element={<PublicRoute component={Register} restricted />} />

            <Route path='/privacy' element={<PublicRoute component={PrivacyPolicy} />} />
            <Route path='/terms' element={<PublicRoute component={TermsAndConditions} />} />

            <Route path='/home' element={<PrivateRoute component={Home} />} />
            <Route path='/profile' element={<PrivateRoute component={Profile} />} />
            <Route path='/chat/:id' element={<PrivateRoute component={Chat} />} />

            {/* Administration routes */}
            <Route path='/administration' element={<AdminRoute component={Administration} />} />

            {/*<Route path='/administration/degrees' element={<AdminRoute component={AdministrationDegree} />} />*/}
            {/*<Route path='/administration/degree/:id' element={<AdminRoute component={AdministrationDegree} />} />*/}

            {/*<Route path='/administration/subjects' element={<AdminRoute component={AdministrationSubject} />} />*/}
            {/*<Route path='/administration/subject/:id' element={<AdminRoute component={AdministrationSubject} />} />*/}

            {/*<Route path='/administration/groups' element={<AdminRoute component={AdministrationGroup} />} />*/}
            {/*<Route path='/administration/group/:id' element={<AdminRoute component={AdministrationGroup} />} />*/}

            {/*<Route path='/administration/users' element={<AdminRoute component={AdministrationUser} />} />*/}
            {/*<Route path='/administration/user/:id' element={<AdminRoute component={AdministrationUser} />} />*/}
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

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
