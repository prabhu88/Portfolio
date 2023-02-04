import {Navigate,useRoutes} from 'react-router-dom'
import DashboardLayout from './Templates/DashboardLayouts'
import Dashboard from './Screens/Main/Dashboard/Dashboard'
import CV  from './Screens/CV/Component/Header'
import Resume from './Screens/CV/Component/Resume'
import MapFinder from './Screens/Map/MapFinder'
import FoodOnline from './Screens/Swiggy/FoodOnline'
import Projects from './Screens/Projects/Projects'
import CompareFile from './Component/excel/Excel_compare'
import B2B_recon from './Component/excel/B2B_recon'
import Gstr2A_recon from './Component/excel/report/Gstr2A'
export default function Router(){
    return useRoutes([
        {
            path : '/',
            element : <DashboardLayout/>,
            children : [
                { path: '/', element: <Dashboard /> },
                // { path: '/', element: <CompareFile /> },
                { path: '/Path-Finding', element: <MapFinder/>},    
                { path : "/Swiggy-Clone", element : <FoodOnline/>},     
                { path : "/Excel", element : <B2B_recon/>}, 
                { path : '/2A-GSTR', element : <Gstr2A_recon />}
            ]
        },
        {
            path : '/My-CV',
            element : <DashboardLayout/>,
            children : [
                { path: '/', element: <CV /> },
                { path: '/Resume', element: <Resume /> },
                { path: '/Projects',element: <Projects />}
            ]
        },
        

    ])
}