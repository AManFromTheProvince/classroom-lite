import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Card from '../Card/Card';

const authForm = (props) => {

    const listOfInputs = Object.keys(props.inputs).map((key, i) => {
        return <Input
            type={props.inputs[key].type}
            label={props.inputs[key].label}
            value={props.inputs[key].value}
            change={(e) => props.change(e, key)}
            key={key+i}
            option={props.inputs[key].options}
        />
    });

    const btnStyle = {margin: "1em 0em"};
    let submitBtn = <Button 
        color="green" 
        btnStyle={btnStyle}
        disabled={props.disable}
        clicked={(e) => props.submit(e)}
         >Next</Button>
    
    if (props.stage === 2) {
        submitBtn = <Button 
        color="green" 
        btnStyle={btnStyle}
        disabled={props.disable}
        clicked={(e) => props.submit(e)}
        >Submit</Button>
    }


    return (
        <Card cardStyle={{width: "80%", margin: "1em auto"}}>
            <form>
                {listOfInputs}
                {submitBtn}
            </form>
        </Card>
    );
}

export default authForm;