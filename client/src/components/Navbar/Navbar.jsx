import { useContext, useEffect, useState, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import axios from "axios";
import "./Navbar.scss";


const Navbar = () => {
  const { logout, isLogin } = useContext(AuthContext);
  const { cartCount, updateCartCount } = useContext(CartContext); 
  
  const location = useLocation();
  const currentPath = location.pathname;

  const [user, setUser] = useState()
  const userId = useMemo(() => {
    return JSON.parse(localStorage.getItem('userData'));
  }, [])

  useEffect( () => {
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
console.log(user);
  const DropDown = () => {
    const [isOpen, setIsOpen] = useState(false)
  
    return (
      <div className="dropDown">
        <div className="userButton" onClick={() => setIsOpen(!isOpen)}><p className="userName">{user?.firstname} {user?.lastname}</p><img className="userLogo" src="images/arrow-down-s-fill.png" alt="userLogo" /></div>
        {isOpen && (
          <ul className="dropDownList">
            <li><a className="dropDownButton" href="/myaccount"><img src="images/id-card-line.png" alt=" "/> MyAccount</a></li>
            <li><a className="dropDownButton" href="/login" onClick={logout}><img src="images/logout-box.png" alt=" "/> Logout</a></li>
          </ul>
        )}
      </div>
    )
  }

  useEffect(() => {
    updateCartCount();
  }, [updateCartCount]); 

  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="logo">
          <img src="/sweetberry.ico" alt="logo" />
        </a>
        <ul id="nav-mobile" className="menu">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <Link to="products" smooth={true} duration={500}>
              Products
            </Link>
          </li>
          <li>
            <Link to="about" smooth={true} duration={500}>
              About
            </Link>
          </li>
          <li>
            <Link to="contact" smooth={true} duration={500}>
              Contact
            </Link>
          </li>
        </ul>
        <div className="rightPart">
          {isLogin ? (
            <>
              <a className="cart" href="/cart">
                <img src="/images/shopping_cart.png" alt="cart" />
                {cartCount > 0 && <p className="count">{cartCount}</p>}
              </a>
              <DropDown/>
            </>
          ) : (
            <>
              {currentPath === "/reg" || currentPath === "/" ? (
                <a className="button" href="/login">
                  Login
                </a>
              ) : (
                <a className="button" href="/reg">
                  Sign up
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
