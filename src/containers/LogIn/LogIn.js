import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import AuthForm from '../../components/UI/AuthForm/AuthForm';
import Message from '../../components/UI/Message/Message';
import Spinner from '../../components/Spinner/Spinner';
import * as actions from '../../store/actions/actionIndex';
import { shouldDisableBtn } from '../../utility/utility';


class LogIn extends Component {

    state = {
        inputs: {
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
        redirect: false
    }

    componentDidMount() {
        this.props.disableShowMessage();
    }

    componentDidUpdate() {
        if (this.props.success) {
            this.setState({redirect: true});
        }
    }

    onSubmitLogIn = (e) => {
        e.preventDefault();
    
        const email = this.state.inputs.email.value;
        const password = this.state.inputs.password.value;
       
        this.props.loginHandler(email, password);
    }

    onChangeHandler = (e, key) => {
        let updatedInputs = {...this.state.inputs};

        updatedInputs[key].value = e.target.value;

        this.setState({inputs: updatedInputs});
    }

    render() {
     
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

        let isInputsValid = shouldDisableBtn(this.state.inputs);

        return (
            <div>
                {loading}
                <h1 style={{margin: "1em auto", width: "10%", color: "#888"}}>Log In</h1>
                <AuthForm 
                    submit={this.onSubmitLogIn} 
                    multistage={false} 
                    inputs={this.state.inputs}
                    change={this.onChangeHandler}
                    hasError={!!this.props.error}
                    disable={this.props.loading || isInputsValid}
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
        loginHandler: (email, password) => dispatch(actions.logIn(email, password)),
        disableShowMessage: () => dispatch(actions.loadEnd())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);