import React from 'react';
import Subject from './Subject/Subject';
import style from './ClassesList.module.css';

const classesList = (props) => {

    let teachingList = <p className={style.NoneText}>No classes!</p>;
    if (props.subjects.length > 0) {
        teachingList = props.subjects.map( subject => {
    
            let active = props.currentClass === subject.classId;
    
            return <Subject 
                name={subject.subjectName}
                key={subject.classId}
                teacher={subject.teacher}
                schedule={subject.schedule}
                section={subject.section}
                active={active}
                currentClassHandler={() => props.currentClassHandler(subject.classId)}
                />
        });
    }

    let studyingList = <p className={style.NoneText}>No classes!</p>;

    const styleClass = [style.ClassesList];

    if (props.show) {
        styleClass.push(style.ShowClasses);
    } else {
        styleClass.push(style.CloseClasses);
    }

    return (
        <aside className={styleClass.join(" ")}>
            <h2 className={style.Header}>Classes</h2>
            <h4 className={style.Text}>You're teaching</h4>
            {teachingList}
            <h4 className={style.Text}>You're studying</h4>
            {studyingList}
        </aside>
    );
}

export default classesList;