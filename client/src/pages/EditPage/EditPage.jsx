import "./EditPage.scss"
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export const EditPage = () => {
    const [user, setUser] = useState()
    const userId = JSON.parse(localStorage.getItem('userData'));

    const [message, setMessage] = useState('');
        const [form, setForm] = useState({
            email: '',
            password: ''
        });
    
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/myaccount/${userId["userId"]}`);
                
                setUser(response.data.user);
    
            } catch (error) {
                console.error("Error loading data", error);
            }
        };
    
        getData()
    
    }, [userId])

    const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
      if (message) {
          setMessage('');
      }
    };

    const editInfoHandler = async () => {
        try {
          await axios.post('/editinformation', {...form}, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        } catch (err) {
          console.log(err)
          const data = err.response?.data || {};
          console.log(data)
          setMessage(data.message || 'Registration failed. Please try again.');
          console.log(message); 
        }
      }

    return (
        <div className="edit-container">
          <div className="edit-window">
              <Routes>
                  <Route path="/editinformation" element={<EditInfoPage user={user} changeHandler={changeHandler} editInfoHandler={editInfoHandler}/>} />
                  <Route path="/changepassword" element={<ChangePasswordPage />} />
              </Routes>
          </div>
        </div>
    );
}

const EditInfoPage = ({user, changeHandler, editInfoHandler}) => {
    return (
      <>
        <h2>Edit Information</h2>
        <form className="form form-edit-info" onSubmit={e => e.preventDefault()}>
            <div className="row">
                <div className="pack">
                    <div className="input-field col s5">
                        <input type="text" name="firstname" className="validate" value={user?.firstname} onChange={changeHandler}/>
                        <label htmlFor="firstname">First Name</label>
                    </div>

                    <div className="input-field col s5">
                        <input type="text" name="lastname" className="validate" value={user?.lastname} onChange={changeHandler}/>
                        <label htmlFor="lastname">Last Name</label>
                    </div>
                </div>
                <div className="pack">
                    <div className="input-field col s5">
                        <input type="email" name="email" className="validate" value={user?.email} onChange={changeHandler}/>
                        <label htmlFor="email">Email</label>
                    </div>                    

                    <div className="input-field col s5">
                        <input type="tel" name="phonenumber" className="validate" value={user?.phonenumber} onChange={changeHandler}/>
                        <label htmlFor="phonenumber">Phone Number</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input type="text" name="address" className="validate" value={user?.address} onChange={changeHandler}/>
                    <label htmlFor="address">Address</label>
                </div>



            </div>
            <div className="row">
                <button className="btn btn-confirm" onClick={editInfoHandler}>Confirm</button>
                <a href="/myaccount" className="btn btn-cancel">Cancel</a>
            </div>
        </form>
      </>
    );
  };
  
  const ChangePasswordPage = () => {
    return (
      <>
        <h2>Change Password</h2>
        <form className="form form-edit-info" onSubmit={e => e.preventDefault()}>
            <div className="row">
                <div className="input-field col s12">
                    <input type="password" name="password" className="validate"/>
                    <label htmlFor="password">Password</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input type="password" name="password" className="validate"/>
                    <label htmlFor="password">New Password</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input type="password" name="password" className="validate"/>
                    <label htmlFor="password">Confirm Password</label>
                </div>
            </div>
            <div className="row">
                <button className="btn btn-confirm">Confirm</button>
                <a href="/myaccount" className="btn btn-cancel">Cancel</a>
            </div>
        </form>
      </>
    );
  };

export default EditPage;