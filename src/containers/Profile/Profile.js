import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditProfile from '../../components/EditProfile/EditProfile';
import {shouldDisableBtn} from '../../utility/utility';
import * as actions from '../../store/actions/actionIndex';

class Profile extends Component {

    state = {
        inputs: {
            firstName: {
                value: "",
                label: "Enter your first name"
            },
            lastName: {
                value: "",
                label: "Enter your last name"
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

    onChangeHandler = (e, key) => {
        const updatedInputs = {...this.state.inputs};
        updatedInputs[key].value = e.target.value;
        this.setState({inputs: updatedInputs});
    }


    render() {

        const disabledBtn = shouldDisableBtn(this.state.inputs);

        return(
            <>
                <EditProfile 
                inputs={this.state.inputs} 
                change={this.onChangeHandler}
                disable={disabledBtn}
                />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);