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
            }

        ],
        currentPosts: [],
        currentClass: null,
        loading: false
    }

    onCurrentClassHandler = (id) => {
        let posts = [
            {
                poster: "Teacher 1",
                body: "Hey I just assigned a new assignment to be submitted on March 31, 2021",
                date: "Mar. 11, 2021 09:10 PM",
                id: id,
                comments: [
                    {
                        poster: "Student 1",
                        body: "Noted!",
                        date: "Mar. 11, 2021 09:31 PM"
                    },
                    {
                        poster: "Student 2",
                        body: "Will do!",
                        date: "Mar. 11, 2021 09:31 PM"
                    }
                ]
            }
        ];
        this.setState({currentClass: id, currentPosts:posts});
    }

    onCloseWorkAreaHandler = () => {
        this.setState({currentClass: null, currentPosts: []});
    }

    render() {

        let workArea = null;

        if (this.state.loading) {
            workArea = <Spinner/>;
        } else if (!!this.state.currentClass) {
            workArea = <WorkArea 
            closeHandler={() => this.onCloseWorkAreaHandler()}
            posts={this.state.currentPosts}
            />;
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