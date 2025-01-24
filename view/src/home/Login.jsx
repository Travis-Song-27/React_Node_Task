import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    
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
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;