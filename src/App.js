import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Order from './pages/Order';
import CheckOrder from './pages/CheckOrder';
import Inventory from './pages/Inventory';
import CreditCard from './pages/CreditCard';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/check-order" element={<CheckOrder />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/payment/:orderId" element={<CreditCard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
