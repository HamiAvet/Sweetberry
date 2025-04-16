import "./InvoicePage.scss";
import { useLocation } from 'react-router-dom';

const InvoicePage = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/');
    
    const invoiceId = currentPath[currentPath.length-1];

    return (
        <div className="invoice-container">
            <div className="invoice-page">
                <h1>Thank you for your order!</h1>
                <p className="order-id">Number: #{invoiceId.split('-')[1]}</p>
                <h5>A confirmation email will be sent to your mailbox very soon.</h5>
                <p className="indication">
                In the meantime, you can find the invoice in the "My Orders" section on your account page, 
                accessible via the button below.
                </p>
                <a href="/myaccount">Go to My Account</a>
            </div>
        </div>
    );
};

export default InvoicePage;
