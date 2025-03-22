import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './other/Login';
import Home from './other/Home';
import Sign from './other/Sign';
import Message from './other/Message';
import Navbar from './components/Navbar/Navbar';
import { NavbarProvider } from './context/NavbarContext'; // Vérifie bien le chemin

export default function App() {
  return (
    <BrowserRouter> 
      <Routes>
        {/* Routes sans contexte */}
        <Route path="/Sign" element={<Sign />} />
        <Route path="/Login" element={<Login />} />

        {/* Routes avec contexte */}
        <Route
          path="/*"
          element={
            <NavbarProvider>
              <div className="flex">
                <Navbar />
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<Message />} />
                    <Route path="/Message" element={<Message />} />
                    <Route path="/Home" element={<Home />} />
                  </Routes>
                </div>
              </div>
            </NavbarProvider>
          }
        />
      </Routes>
    </BrowserRouter >
  );
}
