import React from 'react';
import './f_one.scss';
import m_btm from '../images/m_btm.png';
import m_top from '../images/m_top.png';
import {FaGooglePlay,FaApple} from 'react-icons/fa';
// import {AppsOutlined as FaApple} from '@material-ui/icons'
// import GoogleIcon from '@material-ui/icons/Google';
const F_one = () => {
    return(
        <div className="swiggty_f1Container">
            <div className="swiggty_n_img">
                <h1>Restaurants in your pocket</h1>
                <h3>Order from your favorite restaurants & track on the go, with the all-new Swiggy app.
                    <br/>
                    <br/>
                </h3>
                
                <div className="swiggty_store">
                    <div className="swiggty_googlePlaystore">
                        <FaGooglePlay color="white" size="30px"/>
                        <div>
                                GET IT ON
                            <h4>Google Play</h4>
                        </div>                        
                    </div>
                    <div className="swiggty_AppleStore" >
                        <FaApple color="white" size="35px"/>
                        <div>
                                Download on the
                            <h4>APP Store</h4>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="swiggty_t_img">
                <img src={m_top}/>
            </div>
            <div className="swiggty_t_btm">
                <img src={m_btm}/>
            </div>            
        </div>
    )
}

export default F_one;