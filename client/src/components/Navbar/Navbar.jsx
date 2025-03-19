import { useContext, useEffect } from "react";
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
              <a className="button" href="/login" onClick={logout}>
                Logout
              </a>
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
