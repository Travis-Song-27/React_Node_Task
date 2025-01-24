import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import Login from "./home/Login"
import TodoList from "./todoList/TodoList"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/todoList" element={<TodoList/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
