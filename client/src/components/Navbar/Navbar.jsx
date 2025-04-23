import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import "./Navbar.scss";



const Navbar = () => {
  const { logout, isLogin } = useContext(AuthContext);
  const { cartCount, updateCartCount } = useContext(CartContext); 
  
  const location = useLocation();
  const currentPath = location.pathname;

  const DropDown = () => {
    const [isOpen, setIsOpen] = useState(false)
  
    return (
      <div>
        <button onClick={() => setIsOpen(!isOpen)}>aaaaaaa</button>
        {isOpen && (
          <ul
            style={{
              position: "absolute",
              right: 0,
              top: "110%",
              background: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              borderRadius: "4px",
              listStyle: "none",
              padding: "8px 0",
              margin: 0,
              minWidth: "160px",
              zIndex: 1000,
            }}
          >
            <li><a className="button" href="/login" onClick={logout}>Logout</a></li>
            <li><a className="button" href="/myaccount">MyAccount</a></li>
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
