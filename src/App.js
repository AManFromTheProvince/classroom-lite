import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import TeacherDashboard from './containers/TeacherDashboard/TeacherDashboard';
import CreateClass from './containers/CreateClass/CreateClass';
import Profile from './containers/Profile/Profile';
import NavBar from './components/NavBar/NavBar';
import ClassesList from './components/ClassesList/ClassesList';
import { connect } from 'react-redux';
import * as actions from './store/actions/actionIndex';
import LandingPage from './components/UI/LandingPage/LandingPage';
import SignUp from './containers/SignUp/SignUp';
import LogIn from './containers/LogIn/LogIn';

class App extends Component {

  state = {
    showSidebar: false,
  }

  componentDidMount() {

    if (this.props.isAuth){
      this.props.getSubjectsHandler(this.props.userId);
    } else {
      this.props.checkLoggedInHandler();
    }

  }

  onSidebarHandler = () => {
    this.setState(prevState =>  {
      return {showSidebar: !prevState.showSidebar}
    });
  }

  render() {
    let  routes = (
      <Switch>
        <Route path="/welcome" exact component={LandingPage}/>
        <Route path="/sign-up" exact component={SignUp}/>
        <Route path="/log-in" exact component={LogIn}/>
        <Redirect from="/" to="/welcome" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/u/dashboard" exact component={TeacherDashboard}/>
          <Route path="/u/create-a-class" exact component={CreateClass}/>
          <Route path="/u/my-profile" exact component={Profile}/>
          <Redirect from="/" to="/u/dashboard" />
          <Redirect from="/u/log-out" to="/welcome"/>
        </Switch>
      );
    }

    return (
      <div>
          <NavBar 
          sidebarHandler={this.onSidebarHandler} 
          show={this.state.showSidebar} 
          isAuth={this.props.isAuth}
          logout={this.props.logoutHandler}
          />
          { this.props.isAuth && <ClassesList 
          subjects={this.props.subjects} 
          currentClass={this.props.currentClass}
          currentClassHandler={this.props.getCurrentClassHandler}
          show={this.state.showSidebar}
          />}
          {routes}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subjects: state.app.subjects,
    currentClass: state.app.currentClass,
    userId: state.auth.userId,
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSubjectsHandler: (userId) => dispatch(actions.loadSubjects(userId)),
    getCurrentClassHandler: (id) => dispatch(actions.loadClass(id)),
    logoutHandler: () => dispatch(actions.authReset()),
    checkLoggedInHandler: () => dispatch(actions.checkLoggedIn())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
 