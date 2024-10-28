import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const[user,setUser]=useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const [error, setError] = useState(''); // For showing validation error
    const [success, setSuccess] = useState(''); // For showing success message

    // Handle change for input fields
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear any previous error or success messages
    setError('');
    setSuccess('');

    // Validation: Check if password matches confirm password
    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Make API call to backend to register user
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
      });
      console.log('Response:', response.data); // Log the response
      // If registration is successful, show success message
      setSuccess('User registered successfully!');
      localStorage.setItem('firstName',user.firstName)//to store user's firstname in localstorage
    } catch (error) {
      setError(error.response?.data?.message || 'There was an error registering the user');
    }
  };

  return (
    <div>
         <form onSubmit={handleSubmit} className="form-group">
      <div className="wrapper">
        <div className="title">Register Now</div>
        <div className="form">
          <div className="inputfield">
            <label htmlFor="firstName">First Name<span>*</span></label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="input"
              value={user.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputfield">
            <label htmlFor="lastName">Last Name<span>*</span></label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="input"
              value={user.lastName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="inputfield">
            <label htmlFor="email">Email Address<span>*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputfield">
            <label htmlFor="password">Password<span>*</span></label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputfield">
            <label htmlFor="confirmPassword">Confirm Password<span>*</span></label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="input"
              value={user.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>                  
          <div className="inputfield">
            <input type="submit" value="Register" className="btn" />
          </div>
          <p className="alter">
            Already a Member? <Link className="register" to="/login">Log in now!</Link>
          </p>

          {/* Display error or success messages */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      </div>
    </form>
    </div>
  )
}

export default Signup
