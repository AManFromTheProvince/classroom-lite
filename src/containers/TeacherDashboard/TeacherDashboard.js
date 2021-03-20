import React, { Component } from 'react';
import WorkArea from '../../components/WorkArea/WorkArea';
import Spinner from '../../components/Spinner/Spinner';
import style from './TeacherDashboard.module.css';
import Illustration from '../../components/UI/Illustration/Illustration';
import {shouldDisableBtn} from '../../utility/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/appActions';

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
            const disabledBtn = shouldDisableBtn(this.state.inputs);
            const annoucementMessage = this.state.inputs["announcement"].value;

            workArea = <WorkArea 
            closeHandler={() => this.props.resetClassHandler()}
            posts={this.props.posts}
            subject={subjectName}
            announcement={annoucementMessage}
            changeHandler={this.onChangeHandler}
            disabled={disabledBtn}
            />;
        } else if (this.state.loading) {
            workArea = <Spinner/>;
        }

        return (
            <>
                <div className={style.Dashboard}>
                    {workArea}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentClass: state.app.currentClass,
        subjects: state.app.subjects,
        posts: state.app.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetClassHandler: () => dispatch(actions.resetClass())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDashboard) ;