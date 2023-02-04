import React from 'react'
import './Sign_up.scss';
import {CloseOutlined as AiOutlineClose} from '@material-ui/icons'
import login_Img from '../../component/images/login_Img.png'
const Sign_up = ({fstate,loginToggle}) =>{    
    return(
        <div className="swiggty_LoginS" >
            <div className="LoginL" onClick={()=>fstate(false)}>                
            </div>
            <div className="swiggty_login">
                <div className="close">
                    <AiOutlineClose size="25px"
                    onClick={()=>fstate(false)}                    
                    />
                </div>
                <div className="swiggty_Header">
                    <div>
                        <h1>Sign up</h1>
                        <p>or <span onClick={()=>{loginToggle(true);fstate(false)}}>login to your account</span></p>
                    </div>
                    <img src={login_Img} />                    
                </div>
                <div className="swiggty_formLogin">
                    <div>
                        <input type="text" placeholder="Mobile Number"/>
                        <label>Mobile Number</label>
                    </div>
                    <div>
                        <input type="text" placeholder="Name"/>
                        <label>Name</label>
                    </div>
                    <div>
                        <input type="text" placeholder="Email"/>
                        <label>Email </label>
                    </div>
                    <div>
                        <input type="text" placeholder="Password"/>
                        <label>Password</label>
                    </div>
                    <div className="swiggty_btnS">
                        Continue
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Sign_up;