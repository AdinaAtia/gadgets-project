


import { useEffect, useState } from "react";
import Axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ProductReviews from "./ProductReviews"; // נוסיף את הקומפוננטה
import Button from '@mui/material/Button';


const CreateProduct = () => {
  const [products, setProducts] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(""); // 👈 הוספנו סטייט לחיפוש
  const [showReviews, setShowReviews] = useState({}); // key = productId, value = boolean

  const fetchProducts = async () => {
    const { data } = await Axios.get("http://localhost:7002/api/products");
    console.log(data);
    setProducts(data);
  };

const filteredProducts = products.filter(product =>
  product.name.toLowerCase().includes(globalFilter.toLowerCase())
);
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
<TextField
  variant="outlined"
  placeholder="חיפוש מוצר..."
  value={globalFilter}
  onChange={(e) => setGlobalFilter(e.target.value)}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon sx={{ color: "#333" }} /> {/* טקסט/אייקון כהה כדי שיבלוט */}
      </InputAdornment>
    ),
     endAdornment: null, // מונע את הריבוע הנוסף בצד ימין
  }}
  sx={{
    mb: 4,
    width: "400px",
    bgcolor: "#FFD500",   // הצהוב מהתמונה
    borderRadius: 2,
    boxShadow: 3,
    mx: "auto",
    display: "block",
    '& input[type="search"]::-webkit-search-cancel-button': {
      display: 'none',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none', // אולי הבורדר יוצר את הבעיה
      }
    },
    input: { color: "black", fontWeight: "bold" }, // טקסט קריא
  }}
/>




        
  {
products.length !== 0 ? (
          <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'flex-start', flexDirection: 'row-reverse', marginRight: '260px', marginLeft: '260px' }}>
            {filteredProducts.map((product, index) => (
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
 <Button
    size="small"
    onClick={() =>
      setShowReviews((prev) => ({ ...prev, [product._id]: !prev[product._id] }))
    }
  >
    {showReviews[product._id] ? "הסתר ביקורות" : "הצג ביקורות"}
  </Button>
                </CardActions>
                {/* הצגת רכיב הביקורות מתחת לכרטיס המוצר */}
{showReviews[product._id] && <ProductReviews productId={product._id} />}
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



