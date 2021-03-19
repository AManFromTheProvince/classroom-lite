import React, { Component } from 'react';
import ClassesList from '../../components/ClassesList/ClassesList';
import WorkArea from '../../components/WorkArea/WorkArea';
import NavBar from '../../components/NavBar/NavBar';
import Spinner from '../../components/Spinner/Spinner';
import style from './TeacherDashboard.module.css';

class TeacherDashboard extends Component {
    state = {
        subjects: [
            {
                subjectName: "History 105",
                teacher: "Display name of teacher goes here",
                schedule: "Tue-Th 4:00PM - 7:00PM",
                id: "1192924jk"
            },
            {
                subjectName: "History 105",
                teacher: "Display name of teacher goes here",
                schedule: "Tue-Th 4:00PM - 7:00PM",
                id: "1192924j12"
            },
            {
                subjectName: "History 105",
                teacher: "Display name of teacher goes here",
                schedule: "Tue-Th 4:00PM - 7:00PM",
                id: "1192924jn"
            },
            {
                subjectName: "History 105",
                teacher: "Display name of teacher goes here",
                schedule: "Tue-Th 4:00PM - 7:00PM",
                id: "1192924jn"
            },
            {
                subjectName: "History 105",
                teacher: "Display name of teacher goes here",
                schedule: "Tue-Th 4:00PM - 7:00PM",
                id: "1192924jn"
            },
            {
                subjectName: "History 105",
                teacher: "Display name of teacher goes here",
                schedule: "Tue-Th 4:00PM - 7:00PM",
                id: "1192924jn"
            },
            {
                subjectName: "History 105",
                teacher: "Display name of teacher goes here",
                schedule: "Tue-Th 4:00PM - 7:00PM",
                id: "1192924jn"
            },
            {
                subjectName: "History 105",
                teacher: "Display name of teacher goes here",
                schedule: "Tue-Th 4:00PM - 7:00PM",
                id: "1192924jn"
            }

        ],
        currentClass: null,
        loading: false
    }

    onCurrentClassHandler = (id) => {
        this.setState({currentClass: id});
    }

    render() {

        let workArea = <WorkArea/>;

        if (this.state.loading) {
            workArea = <Spinner/>;
        }

        return (
            <>
                <NavBar/>
                <div className={style.Dashboard}>
                    <ClassesList 
                        subjects={this.state.subjects} 
                        currentClass={this.state.currentClass}
                        currentClassHandler={this.onCurrentClassHandler}
                        />
                    {workArea}
                </div>
            </>
        );
    }
}

export default TeacherDashboard;