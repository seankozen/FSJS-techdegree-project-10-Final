import React from 'react';
import {
  BrowserRouter as 
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

//Component imports
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

//Error component imports
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';

import withContext from './Context';

// With context
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);




function App() {
  return (
    <Router>
      <div className = "container">
      
        <HeaderWithContext/>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/courses"/>} />
          <Route exact path="/courses" render={() => <Courses/>} />
          <Route path="/courses/create" render = {() => <CreateCourse/>} />
          <Route path="/courses/:id" component = {CourseDetailWithContext}  />
          <Route path="/courses/update" render = {() => <UpdateCourse/>} />    {/*Need to change path later*/}
          <Route path ="/signin" component = {UserSignInWithContext} />
          <Route path = "/signup" component = {UserSignUpWithContext} />
          <Route path = "/signout" component = {UserSignOutWithContext} />
          <Route path = "/notfound" component = {NotFound} />
          <Route path = "/forbidden" component = {Forbidden} />
          <Route path = "/error" component = {UnhandledError} />
          
        </Switch>
      </div>
    </Router>
  )
}

export default App;
