const express = require('express');
const htmlToPdf = require('../services/html-to-pdf.js');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const Order = require('../models/Order');
const router = express.Router();

const templatePath = path.join(__dirname, '../templates/template.html');
let templateHTML = fs.readFileSync(templatePath, 'utf8');

let cachedPdf = null;

const makeNewTemplate = (template, user, invoiceId, ordersList) => {
    const tax = 1.45;
    let subtotal = 0;
    let itemsRows = "";
    Object.keys(ordersList).forEach((orderKey, index) => {
        console.log(ordersList);
        
        const items = ordersList[orderKey];
        subtotal += items.Price
        itemsRows += `
            <tr>
                <td>${index + 1}</td>
                <td>${items.Base || "N/A"}</td>
                <td>
                    Second Layer: ${items.SecondLayer || "N/A"}<br>
                    Decorative Lines: ${items.DecorativeLines || "N/A"}<br>
                    Decorative Points: ${items.DecorativePoints || "N/A"}<br>
                    Confetti: ${items.Confetti || "N/A"}
                </td>
                <td>${items.Quantity || 0}</td>
                <td>${items.PriceForOne || "0.00"}€</td>
                <td>${items.Price || "0.00"}€</td>
            </tr>
        `;
    })
    return template
    .replace("{firstname}", user.firstname || "N/A")
    .replace("{lastname}", user.lastname || "N/A")
    .replace("{address}", user.address || "N/A")
    .replace("{phonenumber}", user.phonenumber || "N/A")
    .replace("{email}", user.email || "N/A")
    .replace("{date}", new Date().toLocaleDateString() || "N/A")
    .replace("{invoiceid}", invoiceId || "N/A")
    .replace("{subtotal}", subtotal.toFixed(2) || "N/A")
    .replace("{totalcost}", (subtotal+tax).toFixed(2) || "N/A")
    .replace("{tax}", tax || "N/A")
    .replace("</tbody>", itemsRows + "</tbody>");


}

router.get('/:userId/:invoiceId', async (req, res) => {
    try {
        const userId = req.params['userId']
        const invoiceId = req.params['invoiceId']

        
        const user = await User.findById(userId)
        const orders = await Order.find({ userId: userId, orderId: invoiceId });

        const ordersList = orders[0].items    
        

        let newTemplate = makeNewTemplate(templateHTML, user, invoiceId, ordersList)

        if (!cachedPdf) {
            cachedPdf = await htmlToPdf(newTemplate);
        }
        res.contentType('application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');
        res.end(cachedPdf);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('An error occurred while generating the PDF.');
    }
});


module.exports = router;