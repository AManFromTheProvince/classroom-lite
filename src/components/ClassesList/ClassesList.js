import React from 'react';
import Subject from './Subject/Subject';
import style from './ClassesList.module.css';

const classesList = (props) => {

    const classList = props.subjects.map( subject => {

        let active = props.currentClass === subject.id;

        return <Subject 
            name={subject.subjectName}
            key={subject.id}
            teacher={subject.teacher}
            schedule={subject.schedule}
            active={active}
            currentClassHandler={() => props.currentClassHandler(subject.id)}
            />
    });

    return (
        <aside className={style.ClassesList}>
            {classList}
        </aside>
    );
}

export default classesList;