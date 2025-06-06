import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="slogan-3d" style={{ marginBottom: '1.5rem' }}>
        Save your data in your secure Login
      </div>
      <div className="content-box" style={{ width: '100%', maxWidth: 400 }}>
        <h2 style={{ color: '#0a2342', textShadow: 'none' }}>Login</h2>
        <form>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ marginRight: '10px' }}>Email:</label>
            <input type="email" id="email" name="email" required style={{ borderRadius: 6, border: '1px solid #ccc', padding: '6px 10px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={{ marginRight: '10px' }}>Password:</label>
            <input type="password" id="password" name="password" required style={{ borderRadius: 6, border: '1px solid #ccc', padding: '6px 10px' }} />
          </div>
          <button type="submit" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;