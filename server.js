const express = require('express')
  , cors = require('cors')
  , app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const multer = require('multer');

//const app = express();
require('./models/user.model');
require('./models/category.model');
require('./models/product.model');
require('./models/order.model')

//const router = express().Router();
//const MongoClient = require('mongodb').MongoClient;

// Set up mongoose connection
const mongoose = require('mongoose');
// Evitamos warnings de deprecated
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const DATABASE_URL = 'mongodb+srv://Wakka:vicien21@cluster-hnoscuello-mxbyp.gcp.mongodb.net/hnosCuello-db?retryWrites=true&w=majority';

mongoose.connect(DATABASE_URL, { useNewUrlParser: true}, () =>
  console.log("Connected")).catch(err => console.log(err));
// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const categoryRoute = require('./routes/category.route');
const productRoute = require('./routes/product.route');
const orderRoute = require('./routes/order.route');
const userRoute = require('./routes/user.route');
require('./controllers/config/passport');
const resourceRoute = require('./routes/resource.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// CORS configuration
const originsWhitelist = [
  'http://localhost:4200',      //front-end url for development
   // 'URL of prod-environment -> http://www.hnoscuello.es'
];
const corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}

// Enable CORS in the app
app.use(cors(corsOptions));

// Categories CRUD
app.use(passport.initialize());
app.use('/categories', categoryRoute);
app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/users', userRoute);
app.use(multer({ dest: './uploads', 
  rename: function (fieldname, filename) {
    return filename;
  },
}).any());
app.use('/resources', resourceRoute);

app.get('/', function(req, res) {
  res.send('Hola Mundo!');
});

app.listen(3000, function() {
  console.log('Server started at port 3000');
});