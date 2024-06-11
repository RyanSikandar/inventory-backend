const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require('./config/connectDB');
const app = express();
const PORT = process.env.PORT || 5000
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleware/errorMiddleware');
const productRoute = require('./routes/productRoute');
const contactRoute = require('./routes/contactRoutes');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Pinvent API",
            version:"1.0.0",
            description:"API Documentation for Pinvent"
        },
        servers:[{
            url:"http://localhost:5000"
        
        }]
    },
    apis:["./routes/*.js"]
}

//Connect to mongo db and start server 
//For cookies
const cookieParser = require('cookie-parser')
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    }
    catch (error) {
        console.log(error)
    }
}

//middleware

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(
    {
        origin: ["http://localhost:3000","https://inventory-frontend-three-khaki.vercel.app"],
        credentials: true
    }
));
app.use(cookieParser());

// define upload path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//middle ware for routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactUs", contactRoute);
app.use(errorHandler);
startServer()
//Routes
app.get("/", (req, res) => {
    res.send("hello from main page")
})
