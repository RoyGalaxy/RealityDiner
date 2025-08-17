const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const cors = require("cors")

const app = express()

dotenv.config();

app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "font-src 'self' https://js.stripe.com data:; "
    );
    next();
});

app.use("/checkout/webhook", bodyParser.raw({ type: '*/*' }));
app.use("/whatsapp/webhook", bodyParser.raw({ type: '*/*' }));
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get("/secure", (req, res) => {
    process.env.secured = "true";
    res.send("Everything under control")
})
app.get("/de-secure", (req, res) => {
    process.env.secured = "false";
    res.send("Everything under control")
})

const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const restaurantRoute = require("./routes/restaurant")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")
const colorSchemeRoute = require("./routes/colorScheme")
const metricsRoute = require("./routes/metrics")

// Define allowed origins from environment variables or use defaults
const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.ADMIN_URL,
    "http://localhost:5174",
    "http://localhost:5173",
];

// Configure CORS options with support for multiple origins
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Set-Cookie'],
};

app.use(cors(corsOptions));

app.use(express.static("./public"))
app.use(express.json())
app.use("/users", userRoute)
app.use("/auth", authRoute)
app.use("/restaurants/", restaurantRoute)
app.use("/products", productRoute)
app.use("/carts", cartRoute)
app.use("/orders", orderRoute)
app.use("/checkout", stripeRoute)
app.use("/colors", colorSchemeRoute)
app.use("/metrics", metricsRoute)

mongoose.set('strictQuery', false)
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to database")
        app.listen(process.env.PORT || 3000, () => {
            console.log("server started at port:", process.env.PORT || 3000)
        })
    })
    .catch(err => console.log(err))
