const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// Be careful to the order, as passport service will use the "User" Model
require("./models/Stations")
require("./models/RawData")
require("./models/Statistics")
require('./models/User');
require('./services/passport');
mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
// app.use(
//     cookieSession({
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//         keys: [keys.cookieKey]
//     })
// );
// app.use(passport.initialize());
// app.use(passport.session());

require('./routes/stationRoutes')(app);
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);