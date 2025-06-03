import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import MenuPage from './pages/MenuPage';
// Remove or comment out import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/menu" element={<MenuPage />} />
          {/* Add other routes here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
