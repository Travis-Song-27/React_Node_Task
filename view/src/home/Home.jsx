import Button from '@mui/material/Button';
import { useNavigate } from "react-router";
import { useEffect, useState } from 'react';

function Home() {
    let navigate = useNavigate();

    return (
      <>
        <div>This is home page.</div>
        <Button 
          onClick={() => {navigate("/todoList")}}
          variant="contained"
        >
          Navigate to TodoList
        </Button>
      </>
    )
} 

export default Home