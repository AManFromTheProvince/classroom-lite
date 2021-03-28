import React from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import style from './AddStudent.module.css';
import Card from '../UI/Card/Card';

const addStudent = (props) => {

  
    const inputs = Object.keys(props.inputs).map(key => {
        return <Input 
        placeholder={props.inputs[key].placeholder}
        value={props.inputs[key].value}
        change={props.change}
        type={props.inputs[key].type}
        label={props.inputs[key].label}
        key={key}
        />
    })

    const cardStyle = {
        margin: "auto",
        width: "50%",
        position: "absolute",
        top: "40%",
        left: "25%"
    }

    const spanStyle = {
        color: "#888",
        cursor: "pointer"
    }

    return (
        <div className={style.AddStudent}>
            <Card cardStyle={cardStyle}>
                <span className="material-icons" onClick={props.clicked} style={spanStyle}>close</span>
                {inputs}
                <Button color="green" btnStyle={{margin: "1em 0em"}} clicked={props.addStudents}>Add student</Button>
            </Card>
        </div>
    )
}

export default addStudent;