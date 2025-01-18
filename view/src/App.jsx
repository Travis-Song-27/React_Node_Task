import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./home/Home"
import TodoList from "./todoList/TodoList"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/todoList" element={<TodoList/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
