import { Button, Typography }  from '@mui/material';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';


function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("user_id");
    navigate('/login');
  }


  useEffect(() => {

    const isTokenExpired = (tk) => {
      if (!tk) return true;
      try {
        const payloadBase64 = tk.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));

        const currentTime = Math.floor(Date.now() / 1000); 
        return decodedPayload.exp < currentTime; 
      } catch (error) {
        console.error("Error decoding token:", error);
        return true; 
      }
    }

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user_id')
      navigate("/login"); 
    }
  }, [navigate]);

  return (
    <>
      <Button
        color="info"
        variant="contained"
        onClick={handleLogOut}
        sx={{ marginBottom: 10 }}
      >
        Log out
      </Button>
      <Typography variant="h3" textAlign="center" mb={5}>
        Welcome to the Home Page
      </Typography>
      <Button
        variant='contained'
        color='success'
        onClick={() => navigate('/todoList')}
      >
        Go to todo-list page
      </Button>
    </>
  )
}

export default Home;