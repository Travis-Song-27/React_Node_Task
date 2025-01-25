import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const URL = "http://localhost:5000";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [])
  
  const signInConnection = async (username, password) => {
    try {
      const res = await fetch(`${URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      return await res.json();

    } catch (err) {
      console.error("There is an error caught in login: ", err);
      return err;
    }
  }

  const handleLogin = async (username, password) => {
    const res = await signInConnection(username, password);

    console.log(res);

    if (res.success) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user_id', res.user_id);
      console.log('Information is set on localStorage.');

      navigate('/home');
     
    } else {
      if (res.message === "Invalid Credentials(not valid username or password)") {
        alert("Invalid Credentials(not valid username or password)");
      } else if (res.message === "Need username and password both") {
        alert("You need to put in username and password");
      } else {
        alert("Something went wrong.")
      }
    }
  }

  return (
    <div>
      <Box
        sx={{
          width: 300,
          padding: 3,
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(245, 245, 245, 1)',
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={() => handleLogin(username, password)}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;