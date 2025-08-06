


//yuc 
import Axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const UpdateProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const productState = location.state;

    const [name, setName] = useState("");
    const [descreption, setDescreption] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [img, setImg] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        setName(productState.product.name);
        setDescreption(productState.product.descreption);
        setPrice(productState.product.price);
        setCompany(productState.product.company);
        setImg(productState.product.img);
        setId(productState.product._id);
    }, []);
    
    const changeProduct = async () => {
        try {
            navigate('/ManageProducts');
            console.log(name, descreption, price, company, img);
            const { data } = await Axios.put("http://localhost:7002/api/products", { id, name, descreption, price, company, img },
                {headers:{'Authorization':`${localStorage.getItem("token")}`}
            }
            );
            if(data!==null){
                alert("מוצר עודכן בהצלחה!");
              }
        } 
        
        catch (err) {
            if (err.response.status === 400) {
                alert("שגיאה בהזנה");
            }
            if (err.response.status === 409) {
                alert("מוצר לא מורשה");
            }
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
                עדכון מוצר
            </Typography>
            <form noValidate autoComplete="off">
                <TextField
                    label="שם מוצר"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="תיאור"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={descreption}
                    onChange={(e) => setDescreption(e.target.value)}
                />
                <TextField
                    label="מחיר"
                    variant="outlined"
                    fullWidth
                    required
                    type="number"
                    margin="normal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    label="חברה"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <TextField
                    label="שם תמונה"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                />
                <Button
              
                  
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={changeProduct}
                    style={{
                        marginTop: '20px',
                        backgroundColor: '#gray',
                        color: '#FFFFFF',
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#FFD700'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#gray'}
                    disabled={name === "" || descreption === "" || price === "" || company === "" || img === ""}
                >
                    עדכן מוצר
                </Button>
            </form>
        </div>
    );
};

export default UpdateProduct;
