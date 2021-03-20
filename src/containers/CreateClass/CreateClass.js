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
                label: "Enter class name"
            },
            section: {
                value: "",
                label: "Enter class section"
            },
            schedule: {
                value: "",
                label: "Enter class schedule"
            }
        }
    }

    componentDidMount() {
        this.props.resetClassHandler();
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

    onResetFields = (inputs) => {
        // this.props.resetCreationClassHandler();
        // this.setState({information: inputs});
    }


    render() {
        const disableBtn = shouldDisableBtn(this.state.information) || this.props.success;
        
        const name = this.state.information.className.value;
        const section = this.state.information.section.value;
        const schedule = this.state.information.schedule.value;

        let message = null;
        if (this.props.success) {
            message = <Message color="green">Successfully created class!</Message>     
            this.onResetFields(resetInputFields(this.state.information));       
        } else if (this.props.error) {
            message = <Message color="red">Failed to create the class</Message>
        }

        return(
            <div>
                {this.props.loading && <Spinner/>}
                <Create 
                change={this.onChangeHandler} 
                information={this.state.information}
                disable={disableBtn}
                createClass={() => this.props.createClassHandler(name, section, schedule)}
                />
                {message}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentClass: state.app.currentClass,
        loading: state.createClass.loading,
        success: state.createClass.successful,
        error: state.createClass.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetClassHandler: () => dispatch(actions.resetClass()),
        createClassHandler: (name, section, schedule) => dispatch(actions.createClass(name, section, schedule))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClass);