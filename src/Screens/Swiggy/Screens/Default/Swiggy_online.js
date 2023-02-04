import React, { Component, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import axios from 'axios'

import './Fonline.scss'
import img from '../../component/images/Food_logo.png'
import F_others from '../../component/others/F_others'
import F_one from '../../component/others/F_one'
import F_two from '../../component/others/F_two'
import Login from '../Login/Login'
import Sign_up from '../Signup/Sign_up'
import StateListDisp from './stateListdisp'

export class Swiggy_online extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            visible: false
        }
        const [count, setCount] = useState(false);
        const [isSignup, SignUp] = useState(false);
        const [newName, setnewName] = useState("Hungry?");
        const Message = [
            'Hungry?',
            'Unexpected Guests?',
            'Movie Marathan?',
            'Cooking gone wrong?',
            'Game Night?',
            'Late night office?'
        ];
        useEffect(() => {
            const intervalID = setInterval(shuffle, 3000);
            return () => clearInterval(intervalID);
        }, [shuffle])
    }
    shuffle = useCallback(() => {
        const index = Math.floor(Math.random() * Message.length);
        setnewName(Message[index]);
    }, []);

    render() {

        return (
            <div className="swiggty_DefaultFonline">
                <div className="swiggty_left">
                    <div className="swiggty_top_par">
                        <div className="swiggty_logo">
                            <img src={img} />
                        </div>
                        <div className="swiggty_Login_signup">
                            <div className="swiggty_loginBtn" onClick={() => { setCount(true); SignUp(false); }}>
                                <h4>Login</h4>
                            </div>
                            <div className="swiggty_signupBtn" onClick={() => { SignUp(true); setCount(false); }}>
                                <h4>SignUp</h4>
                            </div>
                        </div>
                    </div>
                    <div className="swiggty_content">
                        <div className="">
                            <h1 className="swiggty_Heading">{newName}</h1>
                            <h2 className="swiggty_secHeading">Order food from favorite restaurants near you.</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default withRouter(Swiggy_online);