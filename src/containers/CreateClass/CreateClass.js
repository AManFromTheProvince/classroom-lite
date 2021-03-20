import React, { Component } from 'react';
import Create from '../../components/Create/Create';
import {shouldDisableBtn} from '../../utility/utility';
import * as actions from '../../store/actions/actionIndex';
import { connect } from 'react-redux';

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


    render() {
        const disableBtn = shouldDisableBtn(this.state.information);
        return(
            <div>
                <Create 
                change={this.onChangeHandler} 
                information={this.state.information}
                disable={disableBtn}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentClass: state.app.currentClass
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetClassHandler: () => dispatch(actions.resetClass())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClass);