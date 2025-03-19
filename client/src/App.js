import React from 'react';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import { AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { useAuth } from './hooks/auth.hook';
import { useLocation } from 'react-router-dom';
import './App.scss';

const AppRoutes = ({ isLogin }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const routes = useRoutes(isLogin, currentPath);

  return routes;
};

function App() {
  const [login, logout, token, userId, isReady] = useAuth();
  const isLogin = !!token;

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isReady, isLogin }}>
      <CartProvider>
        <BrowserRouter>
          <div className='App'>
            <Navbar />
            <AppRoutes isLogin={isLogin} />
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthContext.Provider>
  );
}

export default App;
