import React from 'react';
import './FoodOnline.scss';
import Fonline from './Screens/Default/Fonline';
import Home from './Screens/Home/Home'
import Restaurants from './Screens/Restaurants/Restaurants'
const FoodLayout = ({ children }) => {
    return (
        <div className="swiggty_RootFoodOrder">
            {children}
        </div>
    )
}

const FoodOnline = () => {    
    return (
        <>
            <FoodLayout>
                <Fonline />
            </FoodLayout>

        </>
    )
}
export default FoodOnline;