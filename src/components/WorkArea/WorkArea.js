import React from 'react';
import style from './WorkArea.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Card from '../../components/UI/Card/Card';
import Posts from '../../components/Posts/Posts';

const workArea = (props) => {

    let cardStyle = {
        width: "60%",
        margin: "0em auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }


    return (
        <div className={style.WorkArea}>

            <div className={style.Nav}>
                <span className="material-icons" onClick={props.closeHandler}>clear</span>
                <Button color="red"> Unenroll class </Button>
            </div>

            <h2 className={style.Header}>{props.subject}</h2>

            <Card cardStyle={cardStyle}>
                <div className={style.PostArea}>
                    <h3>{"Teacher 1 "}</h3>
                    <Input 
                    type="textarea" 
                    placeholder="Post something to your class!" 
                    value={props.announcement}
                    change={(e) => props.changeHandler(e)} />
                    <Button 
                        color="green" 
                        btnStyle={{width:"10%", margin: "1em 0em"}}
                        disabled={props.disabled}
                        > Post </Button>
                </div>
            </Card>
            <Posts posts={props.posts}/>
        </div> 
    );
}

export default workArea;