import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import AuthForm from '../../components/UI/AuthForm/AuthForm';
import Message from '../../components/UI/Message/Message';
import Spinner from '../../components/Spinner/Spinner';
import * as actions from '../../store/actions/actionIndex';


class SignUp extends Component {

    state = {
        stage: 1,
        stage1Inputs: {
            email: {
                value: "",
                label: "Enter email address",
                type: "text"
            },
            password: {
                value: "",
                label: "Enter password",
                type: "password"
            }
        },
        stage2Inputs: {
            firstName: {
                value: "",
                label: "Enter First Name",
                type: "text"
            },
            lastName: {
                value: "",
                label: "Enter Last Name",
                type: "text"
            }
        },
        redirect: false
    }

    onSubmitSignUp = (e) => {
        e.preventDefault();
        
        if (this.state.stage === 1) {      
           this.setState({stage: 2});
        } else if(this.state.stage === 2){
            const email = this.state.stage1Inputs.email.value;
            const password = this.state.stage1Inputs.password.value;
            const firstName = this.state.stage2Inputs.firstName.value;
            const lastName = this.state.stage2Inputs.lastName.value;
            
            this.setState({redirect: true});
            this.props.authenticateHandler(email, password, firstName, lastName);
        }
    }

    onChangeHandler = (e, key) => {
        let updatedInputs = {...this.state.stage1Inputs};
        let modifiyingKey = "stage1Inputs";

        if (this.state.stage === 2) {
            updatedInputs = {...this.state.stage2Inputs};
            modifiyingKey = "stage2Inputs";
        }

        updatedInputs[key].value = e.target.value;

        this.setState({[modifiyingKey]: updatedInputs});
    }

    onBackHandler = () => {
        this.setState({stage: 1});
    }

    render() {
        let currentInputs = this.state.stage1Inputs;

        if (this.state.stage === 2) {
            currentInputs = this.state.stage2Inputs;
        }

        let redirectTag = null;
        if (this.state.redirect && !this.props.loading) {
            redirectTag = <Redirect to="/u/dashboard"/>;
        }

        let message = null;
        if (this.props.showMessage) {
            message = <Message color={this.props.messageColor}>{this.props.message}</Message>;
        }

        let loading = null;
        if (this.props.loading) {
            loading = <Spinner/>;
        }

        return (
            <div>
                {loading}
                <h1 style={{margin: "1em auto", width: "10%", color: "#888"}}>Sign up</h1>
                <AuthForm 
                    submit={this.onSubmitSignUp} 
                    stage={this.state.stage} 
                    multistage={true} 
                    inputs={currentInputs}
                    change={this.onChangeHandler}
                    hasError={!!this.props.error}
                    disable={this.props.loading}
                    back={this.onBackHandler}
                />
                {redirectTag}
                {message}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        message: state.ui.message,
        messageColor: state.ui.messageColor,
        loading: state.ui.loading,
        success: state.ui.successful,
        showMessage: state.ui.showMessage
    }
}


const mapDispatchToProps = dispatch => {
    return {
        authenticateHandler: (email, password) => dispatch(actions.authenticate(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);