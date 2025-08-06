


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { TextField, Button, Box, Container, Typography, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from "react-redux";
import { save } from "../../Store/userSlice";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("http://localhost:7002/api/auth/login", { userName, password });
      const token = response.data;
      const decodedToken = jwtDecode(token);
      dispatch(save(decodedToken.userName));
      localStorage.setItem("token", `Bearer ${token}`);
      navigate("/ProductList");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("משתמש לא מורשה");
      }
      if (err.response && err.response.status === 400) {
        alert("שגיאה");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        component="form" 
        onSubmit={login} 
        sx={{ mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px', boxShadow: 2 }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          כניסה
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
        <Button 
          fullWidth 
          variant="contained" 
          color="primary" 
          type="submit" 
          disabled={userName === "" || password === ""}
          sx={{ mt: 2 }}
        >
          כניסה
        </Button>
      </Box>
    </Container>
  );
};

export default Login;


