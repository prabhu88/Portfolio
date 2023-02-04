import React from 'react'
import './stateListdisp.scss'

const StateListDisp = () =>{
    const ParaList = [
        'Ahmedabad','Bangalore', 'Chennai', 'Delhi', 'Gurgaon','Hyderabad','Kolkata', 'Mumbai',
        'Pune','& more.'
    ];
    const updateList = ParaList.map((number)=>{
        return <li  className="swiggy_item">{number}</li>;
    });
    return(
        <ul className="swiggy_list">
            {updateList}
        </ul>
    )
}
export default StateListDisp;