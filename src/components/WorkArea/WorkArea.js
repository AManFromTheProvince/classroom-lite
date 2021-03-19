import React from 'react';
import style from './WorkArea.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Card from '../../components/UI/Card/Card';
import Posts from '../../components/Posts/Posts';

const workArea = (props) => {

    let cardStyle = {
        width: "80%",
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

            <Card cardStyle={cardStyle}>
                <div className={style.PostArea}>
                    <h3>{"Teacher 1 "}</h3>
                    <Input type="textarea" placeholder="Post something to your class!"/>
                    <Button 
                        color="green" 
                        btnStyle={{width:"10%", margin: "1em 0em"}}> Post </Button>
                </div>
            </Card>
            <Posts posts={props.posts}/>
        </div> 
    );
}

export default workArea;