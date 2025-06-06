import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Homepage';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import './App.css';
import Analyze from './pages/Analyze';

function App() {
  return (
    <>
      {/* <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analyze" element={<Analyze />} /> {/* Add the new route */}

      </Routes>
    </>
  );
}

export default App;
