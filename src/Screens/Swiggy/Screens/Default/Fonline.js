import React, { useState, useEffect, useCallback } from 'react'
import {
    Link,
} from 'react-router-dom';
import './Fonline.scss';
import img from '../../component/images/Food_logo.png';
import {SearchOutlined, CompassCalibrationOutlined} from '@material-ui/icons'
import F_others from '../../component/others/F_others';
import F_one from '../../component/others/F_one';
import F_two from '../../component/others/F_two';
import Login from '../Login/Login';
import Sign_up from '../Signup/Sign_up';
import StateListDisp from './stateListdisp'
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios';
const Message = [
    'Hungry?',
    'Unexpected Guests?',
    'Movie Marathan?',
    'Cooking gone wrong?',
    'Game Night?',
    'Late night office?'
];



const Fonline = () => {
    const [count, setCount] = useState(false);
    const [isSignup, SignUp] = useState(false);
    const [newName, setnewName] = useState("Hungry?");
    const [isLoc, loc] = useState('');
    const [LocErr, locErr] = useState(false);
    const shuffle = useCallback(() => {
        const index = Math.floor(Math.random() * Message.length);
        setnewName(Message[index]);
    }, []);
    
    const LoginFun = (e) => {
        e.preventDefault();
        console.log('The link was clicked.');
    };

    const errorLoc = () => {
        return (
            <div className="swiggy_locError">
                You have blocked Swiggy from tracking your location. To use this, change your location settings in browser.
            </div>
        )
    }

    useEffect(() => {
        const intervalID = setInterval(shuffle, 3000);
        return () => clearInterval(intervalID);
    }, [shuffle])

    const getLoc = useCallback(async () => {
        let latitude = 0
        let longtitude = 0

        navigator.geolocation.getCurrentPosition(async () => (position) => {
            console.log("Latitude is :", position.coords.latitude)
            console.log("Longitude is :",)
            latitude = position.coords.latitude
            longtitude = position.coords.longitude

            //const result = await axios.get(Query)

            //error.message AIzaSyBUJGIShHwGjtpKbq2MzvNzVuOV_5ZGz4Q
            locErr(false);
        }, function (error) {
            loc(error.message);
            locErr(true);
            console.error("Error Code = " + error.code + " - " + error.message);
        });
        let Query = "https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/misc/reverse-geocode?latlng=" + latitude + "," + longtitude
        let result = await fetch(Query)
        let address = JSON.stringify(result.data)
        console.log(address)
    }, []);

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
                    <div className="swiggty_searchForm">
                        <from className="form">
                            <div className="swiggty_inputContainer">
                                <input
                                    type='text' className="input"
                                    placeholder='Enter your delivery location'
                                //value={input}
                                //onChange={e => setInput(e.target.value)}
                                />
                                <div className="swiggty_Location" onClick={getLoc}>
                                    <CompassCalibrationOutlined />
                                    locate me
                                </div>
                                <button type='submit' className="swiggty_searchBtn">
                                    <SearchOutlined />
                                    FIND FOOD
                                </button>
                            </div>
                            {
                                LocErr === true ? errorLoc() : null
                            }
                        </from>
                    </div>
                    <div className="swiggty_text_uSearch">
                        <p className="swiggty_p_underSearch">POPULAR CITIES IN INDIA</p>
                        <p className="swiggty_p_underSearch1">
                            <StateListDisp/>
                        </p>
                    </div>
                </div>
            </div>
            <div className="swiggty_right">
            </div>
            <F_others />
            <F_one />
            <F_two />
            {count === true && isSignup === false ?
                <Login
                    fstate={setCount}
                    signup={SignUp} /> : null
            }

            {
                count === false && isSignup === true ?
                    <Sign_up
                        fstate={SignUp}
                        loginToggle={setCount} /> : null
            }

        </div>
    )
}

export default Fonline;