import React from 'react';
import style from './WorkArea.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Card from '../../components/UI/Card/Card';
import Posts from '../../components/Posts/Posts';
import AddStudent from '../AddStudent/AddStudent';

const workArea = (props) => {

    let cardStyle = {
        width: "60%",
        margin: "0em auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }  

    let addStudent = null;

    if (props.showAddStudents) {
        addStudent = <AddStudent 
        inputs={props.emailInput} 
        change={(e) => props.emailChange(e)} 
        clicked={props.showAddStudentsHandler}
        addStudents={props.addStudents}
        />;
    }


    return (
        <div className={style.WorkArea}>
            {addStudent}
            <div className={style.Nav}>
                <span className="material-icons" onClick={props.closeHandler}>clear</span>
                <div>
                    <Button color="green" btnStyle={{margin: "0em 1em"}} clicked={props.showAddStudentsHandler}>Add student</Button>
                    <Button color="red" > Unenroll class </Button>
                </div>
            </div>

            <h2 className={style.Header}>{props.subject}</h2>
            <h2 className={style.Header}> Section {props.section}</h2>

            <Card cardStyle={cardStyle}>
                <div className={style.PostArea}>
                    <h3>{props.username}</h3>
                    <Input 
                    type="textarea" 
                    placeholder="Post something to your class!" 
                    value={props.announcement}
                    change={(e) => props.changeHandler(e)} />
                    <Button 
                        color="green" 
                        btnStyle={{width:"10%", margin: "1em 0em"}}
                        disabled={props.disabled}
                        clicked={props.postHandler}
                        > Post </Button>
                </div>
            </Card>
            <Posts posts={props.posts}/>
        </div> 
    );
}

export default workArea;