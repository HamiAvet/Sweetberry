import "./MyAccountPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const MyAccountPage = () => {
    const [user, setUser] = useState()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem('userData'));
                const response = await axios.get(`http://localhost:5000/myaccount/${userId["userId"]}`);
                
                setUser(response.data.user);
                setOrders(response.data.orders);
                
                

            } catch (error) {
                console.error("Error loading data", error);
            }
        };

        getData()

    }, [])
    console.log(orders);
    return (
        <div className="myAccount-container">
            <div className="myOrders">
                <div className="title">
                    <h2>My Orders :</h2>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Date</th>
                            <th>Total Cost</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.orderId}</td>
                                    <td>{order.date}</td>
                                    <td>{order.totalCost} €</td>
                                    <td>state</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4"></td>
                            </tr>
                        )}
                    </tbody>         
                </table>
            </div>
            <div className="myInfo">
                <div className="info">
                    <div className="user">
                        <img src="/images/User.png" alt="user" />
                        <h3>{user?.firstname || "N/A"} {user?.lastname  || "N/A"}</h3>
                    </div>

                    <div className="address">
                        <img src="/images/Map_pin.png" alt="address" />
                        <p>{user?.address || "N/A"}</p>
                    </div>

                    <div className="mail">
                        <img src="/images/Mail.png" alt="mail" />
                        <p>{user?.email || "N/A"}</p>
                    </div>
                    
                    <div className="phone">
                        <img src="/images/Phone.png" alt="phone" />
                        <p>{user?.phonenumber || "N/A"}</p>
                    </div>
                    <a href="/myaccount" className="edit">
                        <img src="/images/Edit.png" alt="edit" />
                        <p>Edit informations</p>
                    </a>
                </div>

                <div className="settings">
                    <p>Change Password</p>
                    <img src="/images/Settings.png" alt="settings" />
                </div>
            </div>
        </div>
    );
};

export default MyAccountPage;
