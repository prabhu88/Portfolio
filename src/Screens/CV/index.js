import React, { useEffect, useState } from 'react'
import { Route, useHistory,useLocation  } from 'react-router-dom'
import Header from './Component/Header'

const CV = () => {
    const location = useLocation();
    return (
        <>           
            <Route path="/My-CV">
                <Header />
            </Route>
        </>


    )
}
export default CV;