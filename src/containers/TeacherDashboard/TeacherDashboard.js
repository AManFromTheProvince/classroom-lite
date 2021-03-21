import React, { Component } from 'react';
import WorkArea from '../../components/WorkArea/WorkArea';
import Spinner from '../../components/Spinner/Spinner';
import style from './TeacherDashboard.module.css';
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
        loading: false
    }

    onChangeHandler = (e) => {
        const updatedInputs = {...this.state.inputs};
        updatedInputs["announcement"].value = e.target.value;

        this.setState({inputs: updatedInputs});
    }

    render() {

        let workArea = <Illustration/>;
        if (!!this.props.currentClass) {
            const subjectName = this.props.subjects.filter((subj) => subj.id === this.props.currentClass)[0].subjectName;
            const disabledBtn = shouldDisableBtn(this.state.inputs) || this.props.success || this.props.error;
            const annoucementMessage = this.state.inputs["announcement"].value;
            
            workArea = <WorkArea 
            closeHandler={() => this.props.resetClassHandler()}
            posts={this.props.posts}
            subject={subjectName}
            announcement={annoucementMessage}
            changeHandler={this.onChangeHandler}
            postHandler={() => this.props.createPostHandler(this.props.name, this.state.inputs.announcement.value, this.props.currentClass)}
            disabled={disabledBtn}
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
        loading: state.dashboard.loading,
        success: state.dashboard.success,
        error: state.dashboard.error,
        showMessage: state.dashboard.showMessage,
        messageColor: state.dashboard.messageColor,
        message: state.dashboard.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetClassHandler: () => dispatch(actions.resetClass()),
        createPostHandler: (name, body, classId) => dispatch(actions.createPost(name, body, classId))    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDashboard) ;