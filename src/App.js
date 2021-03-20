import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import TeacherDashboard from './containers/TeacherDashboard/TeacherDashboard';
import CreateClass from './containers/CreateClass/CreateClass';
import Profile from './containers/Profile/Profile';
import NavBar from './components/NavBar/NavBar';
import ClassesList from './components/ClassesList/ClassesList';
import { connect } from 'react-redux';
import * as actions from './store/actions/actionIndex';

class App extends Component {

  state = {
    showSidebar: false,
  }

  componentDidMount() {
    this.props.getSubjectsHandler();
  }

  onSidebarHandler = () => {
    this.setState(prevState =>  {
      return {showSidebar: !prevState.showSidebar}
    });
  }

  render() {
    return (
      <div>
          <NavBar sidebarHandler={this.onSidebarHandler} show={this.state.showSidebar}/>
          <ClassesList 
          subjects={this.props.subjects} 
          currentClass={this.props.currentClass}
          currentClassHandler={this.props.getCurrentClassHandler}
          show={this.state.showSidebar}
          />
          <Switch>
            <Route path="/t/dashboard" exact component={TeacherDashboard}/>
            <Route path="/t/create-a-class" exact component={CreateClass}/>
            <Route path="/t/my-profile" exact component={Profile}/>
            <Redirect from="/" to="/t/dashboard" />
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subjects: state.app.subjects,
    currentClass: state.app.currentClass
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSubjectsHandler: () => dispatch(actions.loadSubjects()),
    getCurrentClassHandler: (id) => dispatch(actions.loadClass(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
 