import React from 'react';
import Card from '../UI/Card/Card';
import style from './EditProfile.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

const editProfile = (props) => {

    let cardStyle = {
        width: "80%",
        margin: "1em auto"
    }


    const inputs = Object.keys(props.inputs).map((key, index) => {
        return <Input
        type="text"
        label={props.inputs[key].label}
        value={props.inputs[key].value}
        key={key+index}
        change={(e) => props.change(e, key)}
        />
    });


    return (
        <div>
            <h1 className={style.Header}>My Profile</h1>
            <Card cardStyle={cardStyle}>
                {inputs}
                <Button 
                color="green" 
                btnStyle={{width:"12.5%", margin: "1em 0em"}} 
                disabled={props.disable}>Save changes</Button>
            </Card>
        </div>
    );
}

export default editProfile;