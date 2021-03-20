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

    const styleClass = [style.ClassesList];

    if (props.show) {
        styleClass.push(style.ShowClasses);
    } else {
        styleClass.push(style.CloseClasses);
    }

    return (
        <aside className={styleClass.join(" ")}>
            <h2 style={{margin: "0em 0.75em", color: "#888"}}>Classes</h2>
            {classList}
        </aside>
    );
}

export default classesList;