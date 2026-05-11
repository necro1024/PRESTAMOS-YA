import { BrowserRouter, Routes, Route } from "react-router-dom";

import Prestamos from "./pages/Prestamos";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/prestamos" element={<Prestamos />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;