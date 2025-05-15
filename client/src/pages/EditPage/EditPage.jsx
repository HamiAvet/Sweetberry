import "./EditPage.scss"
import { Route, Routes } from "react-router-dom";


export const EditPage = () => {

    return (
        <div className="edit-container">
          <div className="edit-window">
              <Routes>
                  <Route path="/editinformation" element={<EditInfoPage />} />
                  <Route path="/changepassword" element={<ChangePasswordPage />} />
              </Routes>
          </div>
        </div>
    );
}

const EditInfoPage = () => {
    return (
      <>
        <h2>Edit Information</h2>
        <form className="form form-edit-info" onSubmit={e => e.preventDefault()}>
            <div className="row">
                <div className="pack">
                    <div className="input-field col s5">
                        <input type="text" name="firstname" className="validate"/>
                        <label htmlFor="firstname">First Name</label>
                    </div>

                    <div className="input-field col s5">
                        <input type="text" name="lastname" className="validate"/>
                        <label htmlFor="lastname">Last Name</label>
                    </div>
                </div>
                <div className="pack">
                    <div className="input-field col s5">
                        <input type="text" name="address" className="validate"/>
                        <label htmlFor="address">Address</label>
                    </div>

                    <div className="input-field col s5">
                        <input type="tel" name="phonenumber" className="validate"/>
                        <label htmlFor="phonenumber">Phone Number</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <input type="email" name="email" className="validate"/>
                    <label htmlFor="email">Email</label>
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