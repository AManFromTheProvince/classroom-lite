import React from 'react';
import Input from '../../components/UI/Input/Input';
import Card from '../../components/UI/Card/Card';
import style from './Create.module.css';
import Button from '../UI/Button/Button';

const create = (props) => {

    let cardStyle = {
        width: "80%",
        margin: "1em auto"
    }

    let inputList = Object.keys(props.information).map(info => {
        return <Input 
        type="text" 
        label={props.information[info].label} 
        change={(e)=>props.change(e, info)} 
        value={props.information[info].value}
        key={props.information[info].label}
        />;
    })
    return (
        <>  
            <h1 className={style.Header}>Create a class</h1>
            <Card cardStyle={cardStyle}>
                {inputList}
                <Button 
                color="green" 
                btnStyle={{width:"10%", margin: "1em 0em"}} 
                disabled={props.disable}>Create class</Button>
            </Card>
        </>
    );
}

export default create;