import * as actions from './actionTypes';

export const loadSubjects = () => {
    //getting info from firebase goes here
    const subjects = [
        {
            subjectName: "History 105",
            teacher: "Display name of teacher goes here",
            schedule: "Tue-Th 4:00PM - 7:00PM",
            id: "1192924jk"
        },
        {
            subjectName: "History 123",
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
    ]

    return {type: actions.LOAD_SUBJECTS, payload: {subjects: subjects}};
}


export const loadClass = (id) => {
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
    return {type: actions.LOAD_CLASS, payload: {classId: id, posts: posts}};
}

export const resetClass = () => {
    return {type: actions.RESET_CLASS}
}

