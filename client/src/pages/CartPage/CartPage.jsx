import "./CartPage.scss";
import { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";


const GetOrders = () => {
    const items = useMemo(() => {
        return JSON.parse(localStorage.getItem("cart")) || {};
    }, []);

    const configs = {
        "Milk Chocolate": "images/milkchocolate.png",
        "Pink Chocolate": "images/pinkchocolate.png",
        "Dark Chocolate": "images/darkchocolate.png",
        "White Chocolate": "images/whitechocolate.png",
    };

    const initialQuantities = useMemo(() => {
        return Object.fromEntries(
            Object.keys(items).map((key) => [key, items[key].Quantity || 1])
        );
        
        
    }, [items]);

    const initialPrices = useMemo(() => {
        return Object.fromEntries(
            Object.keys(items).map((key) => [key, items[key].Price || 0])
        );
    }, [items]);

    const initialPricesForOne = useMemo(() => {
        return Object.fromEntries(
            Object.keys(items).map((key) => [key, items[key].PriceForOne || items[key].Price || 0])
        );
    }, [items]);

    const { updateCartCount } = useContext(CartContext);
    const [count, setCount] = useState(initialQuantities);
    const [price, setPrice] = useState(initialPrices);
    const priceForOne = initialPricesForOne;

    useEffect(() => {
        const updatedQuantities = Object.fromEntries(
            Object.keys(items).map((key) => [key, items[key].Quantity || 1])
        );
        setCount(updatedQuantities);
        
    }, [items]);


    const plus = (key) => {
        setCount((prevCount) => ({
            ...prevCount,
            [key]: prevCount[key] + 1,
        }));

        setPrice((prevPrice) => ({
            ...prevPrice,
            [key]: prevPrice[key] + priceForOne[key],
        }));

        items[key].Quantity = count[key] + 1;
        items[key].Price = price[key] + priceForOne[key]
        localStorage.setItem("cart", JSON.stringify(items));
        updateCartCount()
    };

    const minus = (key) => {
        if (count[key] > 1) {
            setCount((prevCount) => ({
                ...prevCount,
                [key]: prevCount[key] - 1,
            }));

            setPrice((prevPrice) => ({
                ...prevPrice,
                [key]: prevPrice[key] - priceForOne[key],
            }));

            items[key].Quantity = count[key] - 1;
            items[key].Price = price[key] - priceForOne[key]
            localStorage.setItem("cart", JSON.stringify(items));
            updateCartCount()

        } else {
            delCart(key);
        }
    };

    const delCart = (key) => {
        const updatedOrders = { ...items };
        delete updatedOrders[key];
        localStorage.setItem("cart", JSON.stringify(updatedOrders));
        window.location.reload();
    };
    
    return (
        <>
            {Object.keys(items).map((itemsKey) => {
                const item = items[itemsKey];
                const currentCount = count[itemsKey];

                return (
                    <div className="item" key={itemsKey}>
                        <img src={configs[item.Base]} alt={item.Base} />
                        <div className="item-info">
                            <h4>{item.Base}</h4>
                            <div className="small-underline"></div>
                            <p>Second layer: {item.SecondLayer || "None"}</p>
                            <p>Decorative lines: {item.DecorativeLines || "None"}</p>
                            <p>Decorative points: {item.DecorativePoints || "None"}</p>
                            <p>Confetti: {item.Confetti || "None"}</p>
                        </div>
                        <div className="extra">
                            <button className="delete" onClick={() => delCart(itemsKey)}>
                                <img src="images/delete_bin.png" alt="delete" />
                            </button>
                            <div>
                                <p className="item-price">
                                    {Math.round(price[itemsKey] * 100) / 100} €
                                </p>
                                <div className="quantity">
                                    <button className="minus" onClick={() => minus(itemsKey)}>
                                        <p>-</p>
                                    </button>
                                    <div className="count">
                                        <p>{currentCount}</p>
                                    </div>
                                    <button className="plus" onClick={() => plus(itemsKey)}>
                                        <p>+</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};


const CartPage = () => {
    const items = JSON.parse(localStorage.getItem("cart")) || {};
    const userId = JSON.parse(localStorage.getItem('userData'))["userId"]; 
    const tax = 1.45;
    let totalPrice = 0;
    let orderId = `INV-${Math.round(Math.random()*10000)}`;
    console.log(orderId);
    
    
    Object.keys(items).forEach((itemsKey) => {        
        totalPrice += items[itemsKey].Price || 0;
    });
    
    const cartHandler = async () => {
        try {
            await axios.post('/api/cart', {orderId, userId, items})
        } catch (err) {
          console.log(err)
        }
    }

    return (
        <div className="cart-container">
            {Object.keys(items).length === 0 ? (
                <div className="empty-cart">
                    <h1>Your shopping cart is empty</h1>
                    <h4>Please choose an item on the home page</h4>
                    <a className="back" href="/">Go to main page</a>
                </div>
            ) : (
                <>
                    <div className="cart">
                        <h1>Cart</h1>
                        <GetOrders />
                    </div>
                    <div className="summary">
                        <h1>Summary</h1>
                        <div className="small-underline"></div>
                        <div className="subtotal">
                            <p className="title">Subtotal</p>
                            <p className="cost">{Math.round(totalPrice * 100) / 100} €</p>
                        </div>
                        <div className="shipping-costs">
                            <p className="title">Shipping costs</p>
                            <p className="cost">{Math.round(tax * 100) / 100} €</p>
                        </div>
                        <div className="total-cost">
                            <p className="title">Total cost</p>
                            <div className="subtitle">
                                <p className="cost">
                                    {Math.round((totalPrice + tax) * 100) / 100} €
                                </p>
                                <p className="taxe">All taxes included</p>
                            </div>
                        </div>
                        <div className="checkout-button" onClick={cartHandler}>
                           <Link to={`/invoice/${orderId}`} className="checkout">CheckOut</Link>
                            
                        </div>
                       
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;