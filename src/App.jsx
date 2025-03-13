import './App.css'
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import Login from './other/Login'
import Home from './other/Home'
import Sign from './other/Sign'
import Message from './other/Message'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Message/>}/>
        <Route path='/Sign' element={<Sign/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Message' element={<Message/>}/>
        <Route path='/Home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}