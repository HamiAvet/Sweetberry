import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="page-footer">
            <div className="container-footer">
                <div className="copyrights">
                    <div className="name">
                        <h5>Sweetberry</h5>
                        <img src="/sweetberry.ico" alt="logo"/>
                    </div>
                    <p>Copyright 2024 © All rights reserved </p>
                </div>
                <div className="contact-info">
                    <ul id="footer-mobile" className="menu">
                        <li>
                            <img src="images/Vectorphone.png" alt="phone" />
                            <p>+33 6 82 04 69 63</p>
                        </li>
                        <li>
                            <img src="images/Vectorinstagram.png" alt="instagram" />
                            <p>Sweet_Berry</p>
                        </li>                        
                        <li>
                            <img src="images/Vectoremail.png" alt="email" />
                            <p>sweetberry@gmail.com</p>
                        </li>                        
                        <li>
                            <img src="images/Vectorfacebook.png" alt="facebook" />
                            <p>SweetBerry@</p>
                        </li>
                    </ul>
                </div>
            </div>
      </footer>
    )
}

export default Footer