

// זה הטוב
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Container, Typography, IconButton, Grid, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = () => {
    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        getBasket();
    }, []);

    const getBasket = async () => {
        try {
            const { data } = await Axios.get("http://localhost:7002/api/cart", { headers: { Authorization: localStorage.getItem("token") } });
            setCartList(data);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteFromBasket = async (id) => {
        try {
            const {data}= await Axios.delete(`http://localhost:7002/api/cart/${id}`, { headers: { Authorization: localStorage.getItem("token") } });
            if(data!==null){
                alert("מוצר נמחק בהצלחה!");
              }
            getBasket();
        } catch (err) {
            
           alert(err);
        }
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: '20px' }}>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
                סל קניות
                <ShoppingCartIcon style={{ marginLeft: '10px' }} />
            </Typography>
            {cartList.length !== 0 ? (
                <Grid container spacing={2}>
                    {cartList.map((cart) => (cart.product!=null?
                        <Grid item xs={12} key={cart._id}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #ccc',
                                padding: '10px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                backgroundColor: '#f9f9f9'
                            }}>
                                <Box sx={{ flexShrink: 0 }}>
                                    <img
                                        src={`./${cart.product.img}.jpg`}
                                        alt={cart.product.name}
                                        style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                                    />
                                </Box>
                                <Box sx={{ flexGrow: 1, marginLeft: '20px' }}>
                                    <Typography variant="h6" component="div">
                                        {cart.product.descreption}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
                                    <Typography variant="h6" sx={{ marginBottom: '10px', color: 'black', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                        {`₪${cart.product.price}`}
                                    </Typography>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => deleteFromBasket(cart._id)}
                                        style={{ color: 'gray' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#FFD700'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'gray'}
                                    >
                                        <DeleteIcon style={{ fontSize: '1.5rem' }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                    :<></>))}
                </Grid>
            ) : (
                <Typography variant="h6" align="center" color="text.secondary">
                    טוען...
                </Typography>
            )}
        </Container>
    );
};

export default Cart;
