import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import TeacherDashboard from './containers/TeacherDashboard/TeacherDashboard';
import CreateClass from './containers/CreateClass/CreateClass';
import Profile from './containers/Profile/Profile';
import NavBar from './components/NavBar/NavBar';
import ClassesList from './components/ClassesList/ClassesList';
import { connect } from 'react-redux';
import * as actions from './store/actions/actionIndex';
import Authentication from './containers/Authentication/Authentication';
import LandingPage from './components/UI/LandingPage/LandingPage';
import SignUp from './containers/SignUp/SignUp';

class App extends Component {

  state = {
    showSidebar: false,
  }

  componentDidMount() {
    this.props.getSubjectsHandler(this.props.userId);
  }

  onSidebarHandler = () => {
    this.setState(prevState =>  {
      return {showSidebar: !prevState.showSidebar}
    });
  }

  render() {
    let  routes = (
      <Switch>
        <Route path="/auth" exact component={LandingPage}/>
        <Route path="/a/sign-up" exact component={SignUp}/>
        <Route path="/a/log-in" exact component={Authentication}/>
        <Redirect from="/a/welcome" to="/auth"/>
        <Redirect from="/" to="/auth" />
      </Switch>
    );

    if (this.props.isAuth && this.props.userType === "Teacher") {
      routes = (
        <Switch>
          <Route path="/t/dashboard" exact component={TeacherDashboard}/>
          <Route path="/t/create-a-class" exact component={CreateClass}/>
          <Route path="/t/my-profile" exact component={Profile}/>
          <Redirect from="/" to="/t/dashboard" />
          <Redirect from="/t/log-out" to="/auth"/>
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
    userId: state.app.userId,
    userType: state.auth.userType,
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSubjectsHandler: (userId) => dispatch(actions.loadSubjects(userId)),
    getCurrentClassHandler: (id) => dispatch(actions.loadClass(id)),
    logoutHandler: () => dispatch(actions.authReset())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
 