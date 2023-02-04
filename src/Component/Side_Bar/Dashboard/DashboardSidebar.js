import { useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    Hidden,
    List,
    Typography
} from '@material-ui/core'
import {
    AlertCircle as AlertCircleIcon,
    BarChart as BarChartIcon,
    Lock as LockIcon,
    Settings as SettingsIcon,
    ShoppingBag as ShoppingBagIcon,
    User as UserIcon,
    UserPlus as UserPlusIcon,
    Users as UsersIcon ,   
    Coffee as CoffeeIcon
} from 'react-feather'
import { useDispatch,useSelector } from 'react-redux'
import NavItem from './NavItem'
import prabhu from './Prabhu.jpg'
const items = [
    {
        href: '/',
        icon: BarChartIcon,
        title: 'Dashboard'
    },
    {
        href: '/Path-Finding',
        icon: UsersIcon,
        title: 'Algotithm'
    },
    {
        href: '/My-CV/Projects',
        icon: ShoppingBagIcon,
        title: 'Projects'
    },
    {
        href: '/My-CV',
        icon: UserIcon,
        title: 'CV'
    },
    
    {
        href: '/Swiggy-Clone',
        icon: CoffeeIcon,
        title: 'Swiggy Clone'
    },
    {
        href: '/register',
        icon: UserPlusIcon,
        title: 'Register'
    },
    {
        href: '/2A-GSTR',
        icon: AlertCircleIcon,
        title: 'GSTR 2A Reconcilation'
    },
    {
        href: '/app/settings',
        icon: SettingsIcon,
        title: 'Settings'
    },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
    const location = useLocation();
    const dispatch = useDispatch()    
    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname]);
    const Authuser = useSelector(state => state.auth?.user)
    const user = {
        avatar: Authuser?.photoURL,
        jobTitle: 'Senior Developer',
        name: Authuser?.name
    };
    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2
                }}
            >
                <Avatar
                    component={RouterLink}
                    src={prabhu} //user.avatar
                    sx={{
                        cursor: 'pointer',
                        width: 64,
                        height: 64
                    }}
                    to="/app/account"
                />
                <Typography
                    color="textPrimary"
                    variant="h5"
                >
                    {user.name}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {user.jobTitle}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <List>
                    {items.map((item) => (
                        <NavItem
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </List>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{p:2}}>
                <Typography
                    color="textPrimary"
                    variant="h5"
                    
                >                    
                </Typography>
            </Box>
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                    PaperProps={{
                        sx: {
                            width: 256
                        }
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden lgDown>
                <Drawer
                    anchor="left"
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: 256,
                            top: 64,
                            height: 'calc(100% - 64px)'
                        }
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

DashboardSidebar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
    onMobileClose: () => { },
    openMobile: false
};

export default DashboardSidebar;