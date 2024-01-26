import React, { useState } from 'react';
import './signup.css'
import {  FaAt } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // Handle the server response accordingly

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
    <div className="wrapper">
      <header>
        <h1>Create Account</h1>
      </header>

      <section className="main-content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="pass"
            value={password}
            onChange={handleChange}
            required
          />

          <label htmlFor="password2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="password2"
            placeholder="confirm pass"
            value={password2}
            onChange={handleChange}
            required
          />


          <div className="auth"><FaAt /> GOoglE LoOgIn</div>
          <form onSubmit={handleSubmit}>
      <button className="but">Create Account</button>
    </form>
        </form>
      </section>

      <footer>
        <p>
        Already have an account? <Link to="/login">Login</Link>
        </p>
      </footer>
    </div>
  </div>
    // ... (rest of your component code)
   
    // ... (rest of your component code)
  );
};

export default Signup;
