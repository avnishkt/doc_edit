// LoginForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform your POST request here, using the fetch API or any HTTP client library
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Handle the response accordingly
      if (response.ok) {
        // Successful login, you can redirect or perform any necessary actions
      } else {
        // Handle login failure
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <header>
          <img src="../img/logo.png" alt="Inshare logo" className="inshare-logo" />
          <h1>Login</h1>
        </header>
        <section className="main-content">
          <form onSubmit={handleLogin}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <div className="auth">
              OR
              <a href="/auth">
                <i className="fab fa-google"></i>
              </a>
            </div>
          </form>
        </section>
        <footer>
          
          
          <p>
          Already have an account? <Link to="/login">Login</Link>
          
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LoginForm;
