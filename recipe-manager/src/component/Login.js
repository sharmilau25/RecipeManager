import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // to track the login state
  const navigate = useNavigate();

   // to check if the user has already logged in /token exists
   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);  // User is logged in
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const response = await axios.post('http://localhost:5000/login', { email, password });

        console.log("response=>",response);
        // Save the token in localStorage/sessionStorage
        localStorage.setItem('token', response.data.token);

        setIsLoggedIn(true); // update the login state
        // Redirect to a protected route (e.g., dashboard)
        navigate('/dashboard');
    } catch (error) {
        setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
};

// Handle logout
const handleLogout = () => {
  localStorage.removeItem('token');  // Remove token from localStorage
  setIsLoggedIn(false);  // Update login state
  navigate('/');  // Redirect to home or login page
};
return (
  <div>
    {/* Show Logout button if user is logged in */}
    {isLoggedIn ? (
      <div>
        <p>You are logged in!</p>
        <button onClick={handleLogout} className="btn">Logout</button>
      </div>
    ) : (
      // Show Login form if not logged in
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <div className="title">Log In</div>
          <div className="form">
            <div className="inputfield">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="inputfield">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="inputfield">
              <input type="submit" value="LOG IN" className="btn" />
            </div>
            <p className="alter">
              Not a Member? <Link className="login" to="/signup">Sign Up now!</Link>
            </p>
          </div>
        </div>
      </form>
    )}
  </div>
)
}
export default Login;
