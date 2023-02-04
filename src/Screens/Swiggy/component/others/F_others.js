import React from 'react'
import './f_others.scss'
import fastDelivery from '../images/fastDelivery.png'
import liveOrder from '../images/liveOrder.png' 
import NoOrder from '../images/noOrder.png'

const F_others = () =>{
    return(
        <div className="swiggty_f_other">
            <div className="swiggty_right1">
                <div className="swiggty_imageDiv">
                    <img src={NoOrder}/>
                </div>
                
                <div className="swiggty_f_otherHead">
                    <h4>No Minimum Order</h4>
                </div>
                <div className="swiggty_f_otherPara">
                Order in for yourself or for the group, with no restrictions on order value
                </div>
            </div>            
            <div className="swiggty_center1">
                <div className="swiggty_imageDiv">
                    <img src={liveOrder}/>
                </div>
                
                <div className="swiggty_f_otherHead">
                    <h4>Live Order Tracking</h4>
                </div>
                <div className="swiggty_f_otherPara">
                Know where your order is at all times, from the restaurant to your doorstep
                </div>
            </div>
            <div className="swiggty_left1">
                <div className="swiggty_imageDiv">
                    <img src={fastDelivery}/>  
                </div>
                <div className="swiggty_f_otherHead">
                    <h4>Lighting-Fast Delivery</h4>
                </div>
                <div className="swiggty_f_otherPara">
                Experience Swiggy's superfast delivery for food delivered fresh & on time
                </div>                              
            </div>
        </div>
    )    
}
export default F_others;