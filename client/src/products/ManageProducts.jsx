


import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Box, Typography, Card, CardContent, CardMedia, CardActions, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // const userName = useSelector((state) => state.user.userName); // קבלת המשתמש מ-Redux Store

  // useEffect(() => {
  //   fetchProducts();
  //   console.log(444);
  //   console.log(userName);
  // }, [userName]); // הוספת userName כתלות

  useEffect(() => {
    fetchProducts();
    console.log(444);
  }, []); // הוספת userName כתלות

  const fetchProducts = async () => {
    const { data } = await Axios.get("http://localhost:7002/api/products");
    setProducts(data);
  };

  const addProduct = () => {
    navigate('/ManageProducts/Add');
  };

  const deleteProduct = async (id) => {
    try {
      const { data } = await Axios.delete(`http://localhost:7002/api/products/${id}`, {
        headers: { 'Authorization': `${localStorage.getItem("token")}` }
      });
      fetchProducts();
      if (data !== null) {
        alert("מוצר נמחק בהצלחה!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateProduct = (product) => {
    navigate('/ManageProducts/Update', { state: { product } });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 3,
          position: 'relative',
        }}
      >
      
        <Button
          variant="contained"
          onClick={addProduct}
          sx={{
            marginBottom: 4,
            backgroundColor: '#333',
            color: 'white',
            fontSize: '1.2rem',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: '#FFD700',
              color: 'black'
            }
          }}
        >
          הוסף מוצר
        </Button>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center'
          }}
        >
          {products.length !== 0 ? products.map((product, index) => (
            <Card key={index} sx={{ maxWidth: 272 }}>
              <CardMedia
                component="img"
                height="140"
                image={`./${product.img}.jpg`}
                alt={product.name}
                sx={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '272px'
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {product.descreption}
                </Typography>
                <Typography variant="h6" color="text.primary">
                  ₪ {product.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <IconButton color="secondary" onClick={() => deleteProduct(product._id)}>
                  <DeleteIcon />
                </IconButton>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => updateProduct(product)}
                >
                  עדכון מוצר
                </Button>
              </CardActions>
            </Card>
          )) : (
            <Typography variant="h6" component="div" color="text.secondary">
              טוען...
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default ManageProducts;


