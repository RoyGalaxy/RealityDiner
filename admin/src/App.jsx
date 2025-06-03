import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Admins from './pages/Admins';
import Restaurants from './pages/Restaurants';
import Users from './pages/Users';
// import Complaints from './pages/Complaints';
// import Analytics from './pages/Analytics';
// import Settings from './pages/Settings';
import Login from "./pages/Login";
import ProtectedRoute from './components/ProtectedRoute';
import AdminDetails from './pages/AdminDetails';
import RestaurantDetails from './pages/RestaurantDetails';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/admin/admins" element={
          <ProtectedRoute>
            <Layout>
              <Admins />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/admin/restaurants" element={
          <ProtectedRoute>
            <Layout>
              <Restaurants />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute>
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoute>
        } />
        {/* <Route path="/admin/complaints" element={
          <Layout>
            <Complaints />
          </Layout>
        } />
        <Route path="/admin/analytics" element={
          <Layout>
            <Analytics />
          </Layout>
        } />
        <Route path="/admin/settings" element={
          <Layout>
            <Settings />
          </Layout>
        } /> */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/admins/:id" element={
          <ProtectedRoute>
            <Layout>
              <AdminDetails />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/admin/restaurants/:id" element={
          <ProtectedRoute>
            <Layout>
              <RestaurantDetails />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
