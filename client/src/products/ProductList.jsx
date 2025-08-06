


import { useEffect, useState } from "react";
import Axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const CreateProduct = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await Axios.get("http://localhost:7002/api/products");
    console.log(data);
    setProducts(data);
  };

  const addToBasket = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("אינך מורשה");
      return;
    }
    console.log(token);
    const header = { Authorization: token };
    try {
      await Axios.post("http://localhost:7002/api/Cart", { product: id }, { headers: header });
      alert("נוסף לסל בהצלחה");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden', marginBottom: '20px' }}>
        <img 
          src="./home_page.jpg" 
          alt="logo" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '20px', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            color: 'white', 
            fontSize: '24px', 
            fontFamily: 'Arial, sans-serif', 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            padding: '10px', 
            borderRadius: '5px' 
          }}
        >
          פנקו אחרים...פנקו את עצמכם
        </div>
      </div>
      {
        products.length !== 0 ? (
          <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'flex-start', flexDirection: 'row-reverse', marginRight: '260px', marginLeft: '260px' }}>
            {products.map((product, index) => (
              <Card key={index} sx={{ maxWidth: 272, margin: '10px', flex: '1 0 272px' }}>
                <CardMedia
                  component="img"
                  height="auto"
                  image={`./${product.img}.jpg`}
                  alt={product.name}
                  style={{ objectFit: 'contain', width: '100%', height: '272px' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.descreption}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    ₪ {product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton color="primary" onClick={() => addToBasket(product._id)}>
                    <AddShoppingCartIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </div>
        ) : (
          <h1>loading</h1>
        )
      }
    </>
  );
};

export default CreateProduct;



