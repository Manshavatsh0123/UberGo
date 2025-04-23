const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
connectToDb();
const userRoutes = require('./routes/user.routes');
const captionRoutes = require('./routes/caption.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes')

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true               
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send("Hello Uber!");
});


app.use('/users', userRoutes);
app.use('/captions', captionRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

module.exports = app;