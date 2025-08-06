
// 

import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Container, Typography, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState();
  const [active, setActive] = useState();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const result = await Axios.post("http://localhost:7002/api/auth/register", { userName, password, name, email, phone, roles, active });
      navigate("/Login");
      
    } catch (err) {
      if(err.response.status===409){
        alert("משתמש כפול")
      }
      if(err.response.status===401){
        alert("משתמש לא מורשה")
      }
      if(err.response.status===400){
        alert("שגיאה")
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        component="form" 
        onSubmit={submitForm} 
        sx={{ mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px', boxShadow: 2 }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          הרשמה
        </Typography>
        <TextField 
          fullWidth 
          required 
          label="שם משתמש" 
          margin="normal" 
          onChange={(e) => setUserName(e.target.value)} 
        />
        <TextField 
          fullWidth 
          required 
          type={showPassword ? 'text' : 'password'}
          label="סיסמה" 
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField 
          fullWidth 
          required 
          label="שם" 
          margin="normal" 
          onChange={(e) => setName(e.target.value)} 
        />
        <TextField 
          fullWidth 
          required 
          label="אימייל" 
          type="email" 
          margin="normal" 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <TextField 
          fullWidth 
          required 
          label="טלפון" 
          margin="normal" 
          onChange={(e) => setPhone(e.target.value)} 
        />
        <Button 
          fullWidth 
          variant="contained" 
          color="primary" 
          type="submit" 
          disabled={userName === "" || password === "" || name === "" || email === "" || phone === ""}
          sx={{ mt: 2 }}
        >
          הרשמה
        </Button>
        
      </Box>
    </Container>
  );
};

export default Register;
