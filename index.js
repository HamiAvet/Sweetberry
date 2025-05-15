const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/cart', require('./routes/cart.route'));
app.use('/myaccount', require('./routes/pdf.route'));
app.use('/myaccount', require('./routes/user.route'));
app.use('/editinformation', require('./routes/user.route'));
app.use('/', require('./routes/user.route'));

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.zjmhazo.mongodb.net/sweetberry?retryWrites=true&w=majority&appName=Cluster0');

        app.listen(PORT, () => {
            console.log("Server started successfully on port", PORT);
        })

    } catch (error) {
        console.log(error);
    }
}

start()