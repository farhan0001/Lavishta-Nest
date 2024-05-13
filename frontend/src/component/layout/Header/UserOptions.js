import React, { Fragment, useState } from 'react'
import './Header.css';
import {SpeedDial, SpeedDialAction} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const UserOptions = ({user}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state.cart)
    const alert = useAlert();
    const[open, setOpen] = useState(false);
    const options = [
        {icon: <ListAltIcon />, name: "Orders", func: orders},
        {icon: <PersonIcon />, name: "Profile", func: account},
        {icon: <ShoppingCartIcon style={{color: cartItems.length > 0 ? "tomato" : "unset"}} />, name: `Cart(${cartItems.length})`, func: cart},
        {icon: <ExitToAppIcon />, name: "Log Out", func: logoutUser}
    ];

    if(user.role === "admin"){
        options.unshift({icon: <DashboardIcon />, name: "Dashboard", func: dashboard})
    }

    function dashboard(){
        navigate("/admin/dashboard");
    }
    function orders(){
        navigate("/orders");
    }
    function account(){
        navigate("/account");
    }
    function cart() {
        navigate('/Cart');
    }
    function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully");
    }

  return (
    <Fragment>
        <Backdrop open={open}/>
        <SpeedDial
            ariaLabel='SpeedDial Tooltip Example'
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={open}
            direction='down'
            className='speedDial'
            style={{zIndex: "11"}}
            icon={<img 
                className='speedDialIcon'
                src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                alt='Profile'
            />}
        >
            {
                options.map((item) => (
                    <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth <= 600 ? true: false} />
                ))
            }
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions