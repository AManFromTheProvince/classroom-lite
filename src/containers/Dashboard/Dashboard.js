import React, { Component } from 'react';
import WorkArea from '../../components/WorkArea/WorkArea';
import Spinner from '../../components/Spinner/Spinner';
import style from './Dashboard.module.css';
import Illustration from '../../components/UI/Illustration/Illustration';
import {resetInputFields, shouldDisableBtn} from '../../utility/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actionIndex';
import Message from '../../components/UI/Message/Message';

class TeacherDashboard extends Component {
    state = {
        inputs: {
            announcement: {
                value: "",
                label: "Post something to your class"
            }
        },
        emailInput: {
            email: {
                value: "",
                label: "Enter student email",
                type: "text"
            }
        },
        showAddStudents: false
    }

    componentDidMount() {
        this.props.loadEndHandler();
    }

    onChangeHandler = (e) => {
        const updatedInputs = {...this.state.inputs};
        updatedInputs["announcement"].value = e.target.value;

        this.setState({inputs: updatedInputs});
    }

    onShowAddStudentsHandler = () => {
        this.setState(prevState => {
            return {showAddStudents: !prevState.showAddStudents};
        });
    }

    onEmailChangeHandler = (e) => {
        const updatedInputs = {...this.state.emailInput};
        updatedInputs["email"].value = e.target.value;

        this.setState({emailInput: updatedInputs});
    }

    
    render() {

        let workArea = <Illustration/>;
        if (!!this.props.currentClass) {
            const selectedSubj = this.props.subjects.filter((subj) => subj.classId === this.props.currentClass)[0];
            const subjectName = selectedSubj.subjectName;
            const section = selectedSubj.section;
            const disabledBtn = shouldDisableBtn(this.state.inputs) || this.props.success || this.props.error;
            const annoucementMessage = this.state.inputs["announcement"].value;
            
            workArea = <WorkArea 
            closeHandler={() => this.props.resetClassHandler()}
            posts={this.props.posts}
            subject={subjectName}
            section={section}
            announcement={annoucementMessage}
            changeHandler={this.onChangeHandler}
            postHandler={() => this.props.createPostHandler(this.props.name, this.state.inputs.announcement.value, this.props.currentClass)}
            disabled={disabledBtn}
            username={this.props.username}
            addStudents={() => this.props.addStudentsHandler(this.props.currentClass, this.state.emailInput.email.value, this.props.userEmail)}
            showAddStudentsHandler={this.onShowAddStudentsHandler}
            showAddStudents={this.state.showAddStudents}
            emailInput={this.state.emailInput}
            emailChange={this.onEmailChangeHandler}
            />;
        } else if (this.state.loading) {
            workArea = <Spinner/>;
        }

        if (this.props.success || this.props.error) {
            resetInputFields(this.state.inputs);
        }

        let message = null;
        if (this.props.showMessage) {
            message = <Message color={this.props.messageColor}>{this.props.message}</Message>
        }

        return (
            <>
                {this.props.loading && <Spinner/>}
                <div className={style.Dashboard}>
                    {workArea}
                    {message}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentClass: state.app.currentClass,
        subjects: state.app.subjects,
        posts: state.app.posts,
        name: state.app.userName,
        loading: state.ui.loading,
        success: state.ui.successful,
        error: state.ui.error,
        showMessage: state.ui.showMessage,
        messageColor: state.ui.messageColor,
        message: state.ui.message,
        isAuth: state.auth.isAuth,
        userId: state.auth.userId,
        username: state.auth.username,
        userEmail: state.auth.email
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetClassHandler: () => dispatch(actions.resetClass()),
        createPostHandler: (name, body, classId) => dispatch(actions.createPost(name, body, classId)),
        loadEndHandler: () => dispatch(actions.loadEnd()),
        loadSubjectsHandler: (userId) => dispatch(actions.loadSubjects(userId)),
        getUserHandler: (id) => dispatch(actions.getUserDetails(id)),
        addStudentsHandler: (id, email, userEmail) => dispatch(actions.addStudents(id, email, userEmail))    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDashboard) ;