
//זה הטוב לבנתיים
import React from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Link, Button, Box, Typography } from '@mui/material';
import { Login as LoginIcon, PersonAdd as PersonAddIcon, ManageAccounts as ManageAccountsIcon, ExitToApp as ExitToAppIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { clear } from "../Store/userSlice";

const Layot = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.user.userName); // קבלת המשתמש מ-Redux Store

    const allowManageProducts = () => {
        if (!localStorage.getItem("token")) {
            alert("אינך מורשה");
            return;
        }
        navigate("/ManageProducts");
    };
    const allowCart = () => {
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        if (!localStorage.getItem("token")) {
            alert("אינך מורשה")
            return;
        }
        console.log("kkk");
        navigate("/Cart")
    }
    const exit = () => {
        localStorage.clear();
        navigate("/ProductList")
        dispatch(clear());
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {userName != null && userName !== "" ? (
                <div
                    style={{
                        position: 'absolute',
                        left:370,
                        top: 25,
                        padding: '10px',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                >
                    <Typography variant="body2">
                        משתמש {userName} מחובר
                    </Typography>
                </div>
            ) : <>
            
            </>}
            <AppBar position="static" style={{ backgroundColor: '#333', padding: '10px' }}>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end' }}>
                        


                        <img src="./logo.jpg" alt="logo" style={{ height: '64px', display: 'flex', marginLeft: '50px' }} />
                        <Button color="inherit" onClick={exit} sx={{ display: 'flex', alignItems: 'center', marginLeft: 65 }}>
                            <ExitToAppIcon sx={{ marginLeft: 1 }} />
                            יציאה
                        </Button>

                        <Button color="inherit" sx={{ marginLeft: 11, display: 'flex', alignItems: 'center' }}>
                            <ShoppingCartIcon onClick={allowCart} sx={{ marginLeft: 11 }} />
                        </Button>

                        <Button color="inherit" onClick={allowManageProducts} sx={{ marginLeft: 11, display: 'flex', alignItems: 'center' }}>
                            <ManageAccountsIcon sx={{ marginLeft: 1 }} />
                            ניהול מוצרים
                        </Button>
                        <Link href="/Register" color="inherit" underline="none" sx={{ marginLeft: 11, display: 'flex', alignItems: 'center' }}>
                            <PersonAddIcon sx={{ marginLeft: 1 }} />
                            הרשמה
                        </Link>
                        <Link href="/Login" color="inherit" underline="none" sx={{ marginLeft: 11, display: 'flex', alignItems: 'center' }}>
                            <LoginIcon sx={{ marginLeft: 1 }} />
                            כניסה
                        </Link>
                        <Link href="/ProductList" color="inherit" underline="none" sx={{ marginLeft: 11, marginRight: 34 }}>
                            גאדג'טים
                        </Link>


                    </Box>

                    {/* <img src="./logo.jpg" alt="logo" style={{ height: '64px', marginLeft: '20px' }} />  */}
                </Toolbar>
            </AppBar>
            <main style={{ flexGrow: 1 }}>
                <Outlet />
            </main>
            <footer style={{ backgroundColor: '#333', color: 'white', textAlign: 'center', padding: '10px' }}>

                gadget@gmail.com
                _____הגאדג'טים המובילים שנת 2024. זוכי פרס מדלית העמותה לגאדג'טים ישראל
            </footer>
        </div>
    );
};

export default Layot;

