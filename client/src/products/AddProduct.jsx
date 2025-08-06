

import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [descreption, setDescreption] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [img, setImg] = useState("");
  const submitForm = async (e) => {
    e.preventDefault();
    try{
      navigate('/ManageProducts');
      const obj = { name, descreption, price, company, img };
  
      const { data } = await Axios.post("http://localhost:7002/api/products", obj,
        {headers:{'Authorization':`${localStorage.getItem("token")}`}
      }
      )
      ;
      if(data!==null){
        alert("מוצר נוסף בהצלחה!");
      }
      console.log(data);
      setName("");
      setDescreption("");
      setPrice("");
      setCompany("");
      setImg("");
  
    }
    catch(err){
if(err.response.status===400){
  alert("יש למלאות את כל השדות")
}
    }
    
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          הוספת מוצר
        </Typography>
        <Box component="form" onSubmit={submitForm} sx={{ mt: 3 }}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            label="שם מוצר"
            autoFocus
            margin="normal"
          />
          <TextField
            value={descreption}
            onChange={(e) => setDescreption(e.target.value)}
            required
            fullWidth
            label="תיאור"
            margin="normal"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            fullWidth
            label="מחיר"
            type="number"
            margin="normal"
          />
          <TextField
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            fullWidth
            label="חברה"
            margin="normal"
          />
          <TextField
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
            fullWidth
            label="שם תמונה"
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // disabled={name === "" || price === "" || img === ""}
          >
            הוסף מוצר
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddProduct;
