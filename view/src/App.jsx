import { BrowserRouter, Routes, Route, Navigate, } from "react-router"
import { createContext, useState } from 'react'
import Login from "./login/Login"
import TodoList from "./todoList/TodoList"
import Home from "./home/Home"
import './css/App.css'

export const TokenContext = createContext(null);

function App() {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{token, setToken}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/todoList" element={<TodoList/>} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  )
}

export default App;
