import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import AuthForm from '../../components/UI/AuthForm/AuthForm';
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
            },
            userType: {
                value: "Student",
                label: "Enter type of user",
                type: "select",
                options: {
                    student: "Student",
                    teacher: "Teacher"
                }
            }
        },
        redirect: false
    }

    onSubmitSignUp = (e) => {
        e.preventDefault();
        
        if (this.state.stage === 1) {
            this.setState({stage: 2});

            const email = this.state.stage1Inputs.email.value;
            const password = this.state.stage1Inputs.password.value;
        
            this.props.authenticateHandler(email, password);
        } else if(this.state.stage === 2){
            const firstName = this.state.stage2Inputs.firstName.value;
            const lastName = this.state.stage2Inputs.lastName.value;
            const type = this.state.stage2Inputs.userType.value;

            this.props.addUserHandler(firstName, lastName, type);
            console.log("ASASasasasa");
            this.setState({redirect: true});
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

    render() {
        let currentInputs = this.state.stage1Inputs;

        if (this.state.stage === 2) {
            currentInputs = this.state.stage2Inputs;
        }

        let redirectTag = null;
        //fix this for student and teacher
        if (this.state.redirect && this.props.userType === "Student") {
            redirectTag = <Redirect to="/s/dashboard"/>;
        } else if (this.state.redirect && this.props.userType === "Teacher") {
            redirectTag = <Redirect to="/t/dashboard"/>;
        }

        return (
            <div>
                <h1 style={{margin: "1em auto", width: "10%", color: "#888"}}>Sign up</h1>
                <AuthForm 
                    submit={this.onSubmitSignUp} 
                    stage={this.state.stage} 
                    multistage={true} 
                    inputs={currentInputs}
                    change={this.onChangeHandler}
                />
                {redirectTag}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userType: state.auth.userType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticateHandler: (email, password) => dispatch(actions.authenticate(email, password)),
        addUserHandler: (firstName, lastName, type) => dispatch(actions.addUserDetails(firstName, lastName, type)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);