import "./InvoicePage.scss";
import axios from "axios";
import QRCode from "react-qr-code";
import { useLocation } from 'react-router-dom';

const InvoicePage = () => {
    const userId = JSON.parse(localStorage.getItem('userData'));
    const location = useLocation();
    const currentPath = location.pathname.split('/');
    
    const invoiceId = currentPath[currentPath.length-1];
    
    const downloadPdf = async () => {
        try {
            const response = await axios({
                url: `http://localhost:5000/invoice/${userId["userId"]}/${invoiceId}`,
                method: "GET",
                responseType: "blob",
            });

            
            // Create a Blob from the response data
            const pdfBlob = new Blob([response.data], { type: "application/pdf" });

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(pdfBlob);

            // Create a temporary <a> element to trigger the download
            const tempLink = document.createElement("a");
            tempLink.href = url;
            tempLink.setAttribute("download", "bill.pdf"); // Set the desired filename for the downloaded file

            // Append the <a> element to the body and click it to trigger the download
            document.body.appendChild(tempLink);
            tempLink.click();

            // Clean up the temporary elements and URL
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    return (
        <div className="invoice-container">
            <div className="invoice-page">
                <h1>Thank you for your order!</h1>
                <p className="order-id">Number: #{invoiceId.split('-')[1]}</p>
                <h5>A confirmation email will be sent to your mailbox very soon.</h5>
                <p className="indication">
                    In the meantime, you can download the check via the button below or by scanning the QrCode.
                </p>
                <button onClick={downloadPdf}>Download Check</button>
                <div style={{ height: "auto", margin: "0 auto", maxWidth: 100, width: "100%" }}>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={`http://localhost:3000/invoice/${invoiceId}`}
                        viewBox={`0 0 256 256`}
                    />
                </div>
            </div>
        </div>
    );
};

export default InvoicePage;
