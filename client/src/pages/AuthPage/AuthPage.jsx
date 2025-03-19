import React, { useState, useContext } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./AuthPage.scss"


export const AuthPage = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    console.log("gx");
    
    const [message, setMessage] = useState('');
    const { login } = useContext(AuthContext)

    const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
      if (message) {
          setMessage('');
      }
    };

    const registerHandler = async () => {
        try {
          await axios.post('/api/auth/reg', {...form}, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          navigate('/login')
        } catch (err) {
          console.log(err)
          const data = err.response?.data || {};
          console.log(data)
          setMessage(data.message || 'Registration failed. Please try again.');
          console.log(message); 
        }
      }
    
      const loginHandler = async () => {
        if (!form.email || !form.password) {
            setMessage(null); 
            setTimeout(() => {
                setMessage("Please fill in all fields.");
            }, 0);
            return;
        }

        try {
            const response = await axios.post('/api/auth/login', { ...form }, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            login(response.data.token, response.data.userId);
        } catch (err) {
            const data = err.response?.data || {};
            const errorMsg = data.message || 'Login failed. Please try again.';
            setMessage(null); 
            setTimeout(() => {
                setMessage(errorMsg);
            }, 0);
        }
    };
    

    return (
        <div className="container">
          <div className="auth-page">
              <Routes>
                  <Route path="/login" element={<Login changeHandler={changeHandler} loginHandler={loginHandler} message={message}/>} />
                  <Route path="/reg" element={<Registration changeHandler={changeHandler} registerHandler={registerHandler} message={message}/>} />
              </Routes>
          </div>
        </div>
    );
}

const Login = ({ changeHandler, loginHandler, message }) => {
    return (
      <>
        <h2>Authorization</h2>
        <form className="form form-login" onSubmit={e => e.preventDefault()}>
          <div className="row">
              <div className="input-field col s12">
                { message === "User not found" ? (
                  <input type="email" name="email" className="not-validate" onChange={changeHandler}/>
                ) : (
                  <input type="email" name="email" className="validate" onChange={changeHandler}/>
                )}
                <label htmlFor="email">Email</label>
              </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
            { message === "Wrong password" ? (
              <input type="password" name="password" className="not-validate" onChange={changeHandler}/>
            ) : (
              <input type="password" name="password" className="validate" onChange={changeHandler}/>
            )}
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
              <button 
              className="waves-effect btn btn"
              onClick={loginHandler}
              >
              Login
              </button>
              <Link to="/reg" className="btn-outline btn-reg">Don't have an account?</Link>
          </div>
          {message && <div className="error-message"><p>{message}</p></div>}
        </form>
      </>
    );
  };
  
  const Registration = ({ changeHandler, registerHandler, message }) => {
    return (
      <>
        <h2>Registration</h2>
        <form className="form form-sing-up" onSubmit={e => e.preventDefault()}>
          <div className="row">
            <div className="pack">
              <div className="input-field col s5">
                <input type="text" name="firstname" className="validate" onChange={changeHandler}/>
                <label htmlFor="firstname">First Name</label>
              </div>

              <div className="input-field col s5">
                <input type="text" name="lastname" className="validate" onChange={changeHandler}/>
                <label htmlFor="lastname">Last Name</label>
              </div>
            </div>
            <div className="pack">
            <div className="input-field col s5">
                <input type="text" name="address" className="validate" onChange={changeHandler}/>
                <label htmlFor="address">Address</label>
              </div>

              <div className="input-field col s5">
                <input type="tel" name="phonenumber" className="validate" onChange={changeHandler}/>
                <label htmlFor="phonenumber">Phone Number</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              { message === "This email is already taken, try another one" ? (
                <input type="email" name="email" className="not-validate" onChange={changeHandler}/>
              ) : (
                <input type="email" name="email" className="validate" onChange={changeHandler}/>
              )}
              <label htmlFor="email">Email</label>
            </div>
          </div>

          <div className="row">
              <div className="input-field col s12">
              { message === "Wrong password" ? (
                <input type="password" name="password" className="not-validate" onChange={changeHandler}/>
              ) : (
                <input type="password" name="password" className="validate" onChange={changeHandler}/>
              )}
                <label htmlFor="password">Password</label>
              </div>
          </div>
          <div className="row">
              <button 
              className="waves-effect btn btn"
              onClick={registerHandler}
              >
              Sing up
              </button>
              <Link to="/login" className="btn-outline btn-auth">Already have an account?</Link>
          </div>
          {message && <div className="error-message"><p>{message}</p></div>}
        </form>
      </>
    );
  };

export default AuthPage;