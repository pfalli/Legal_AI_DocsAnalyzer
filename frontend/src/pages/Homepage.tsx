import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="slogan-3d" style={{ marginBottom: '1.5rem' }}>
        Your AI Legal Assistant
      </div>
      <div className="content-box">
        <h2 style={{ color: '#0a2342', textShadow: 'none' }}>Welcome!</h2>
        <p style={{ color: '#222', fontWeight: 500 }}>
          Upload legal documents and let AI extract key clauses and metadata for you.
        </p>
        <nav>
          <Link to="/login" style={{ marginRight: '10px' }}>
            <button>Login</button>
          </Link>
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default HomePage;