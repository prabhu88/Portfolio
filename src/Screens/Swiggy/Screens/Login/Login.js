import React from 'react'
import './login.scss';
import {CloseOutlined as AiOutlineClose} from '@material-ui/icons'
import login_Img from '../../component/images/login_Img.png'
import {Link,useMatch} from 'react-router-dom'
const Login = ({fstate,signup}) =>{    
    let { path, url } = useMatch();
    return(
        <div className="swiggty_LoginS" >
            <div className="LoginL" onClick={()=>fstate(false)}>                
            </div>
            <div className="swiggty_login">
                <div className="swiggty_close">
                    <AiOutlineClose size="25px"
                    onClick={()=>fstate(false)}                    
                    />
                </div>
                <div className="swiggty_Header">
                    <div>
                        <h1>Login</h1>
                        <p>or <span onClick={()=>{signup(true);fstate(false);}}>create an account</span></p>
                    </div>
                    <img src={login_Img} />                    
                </div>
                <div className="swiggty_formLogin " >
                    <div className="field">                        
                        <input type="text" id="mno" name="mno" className="mno" placeholder="Mobile Number"/>
                        <label>Mobile Number</label>
                    </div>
                    {/* <div className="field">
                        <input type="text" placeholder="Mobile Number"/>
                        <label>Mobile Number</label>
                    </div> */}
                    
                    <div className="swiggty_btnlgn">
                        <Link to={`${path}/restaurants`}>Login</Link>                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;