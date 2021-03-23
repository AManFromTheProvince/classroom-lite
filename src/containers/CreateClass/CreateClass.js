import React, { Component } from 'react';
import Create from '../../components/Create/Create';
import {resetInputFields, shouldDisableBtn} from '../../utility/utility';
import * as actions from '../../store/actions/actionIndex';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import Message from '../../components/UI/Message/Message';

class CreateClass extends Component {

    state = {
        information: {
            className: {
                value: "",
                label: "Enter class name",
                type: "text"
            },
            section: {
                value: "",
                label: "Enter class section",
                type: "text"
            },
            schedule: {
                value: "",
                label: "Enter class schedule",
                type: "text"
            }
        }
    }

    componentDidMount() {
        this.props.resetClassHandler();
        this.props.loadEndHandler();
    }

    componentDidUpdate() {
        if (!!this.props.currentClass) {
            this.props.history.push("/t/dashboard");
        }
    }

    onChangeHandler = (e, element) => {
        const updatedInfo = {...this.state.information};
        updatedInfo[element].value = e.target.value;
        this.setState({information: updatedInfo});
    }

    render() {
        const disableBtn = shouldDisableBtn(this.state.information) || this.props.success || this.props.error;
        
        const name = this.state.information.className.value;
        const section = this.state.information.section.value;
        const schedule = this.state.information.schedule.value;

        let message = null;

        if (this.props.success || this.props.error) {
            resetInputFields(this.state.information);
            this.props.loadSubjects();
        } 
        
        if (this.props.showMessage){  
            message = <Message color={this.props.messageColor}>{this.props.message}</Message>   
        }

        return(
            <div>
                {this.props.loading && <Spinner/>}
                <Create 
                change={this.onChangeHandler} 
                information={this.state.information}
                disable={disableBtn}
                createClass={() => this.props.createClassHandler(name, section, schedule, this.props.username, this.props.userId)}
                />
                {message}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentClass: state.app.currentClass,
        loading: state.ui.loading,
        success: state.ui.successful,
        error: state.ui.error,
        showMessage: state.ui.showMessage,
        messageColor: state.ui.messageColor,
        message: state.ui.message,
        username: state.app.userName,
        userId: state.app.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetClassHandler: () => dispatch(actions.resetClass()),
        createClassHandler: (name, section, schedule, username, userId) => dispatch(actions.createClass(name, section, schedule, username, userId)),
        loadSubjects: () => dispatch(actions.loadSubjects()),
        loadEndHandler: () => dispatch(actions.loadEnd())    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClass);