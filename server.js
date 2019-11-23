const express = require('express')
  , cors = require('cors')
  , app = express();
const bodyParser = require('body-parser');

const categoryRoute = require('./routes/category.route');
const productRoute = require('./routes/product.route');
const userRoute = require('./routes/user.route');
//const app = express();

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

mongoose.connect(DATABASE_URL);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
app.use('/categories', categoryRoute);
app.use('/products', productRoute);
app.use('/users', userRoute);

app.get('/', function(req, res) {
  res.send('Hola Mundo!');
});

app.listen(3000, function() {
  console.log('Server started at port 3000');
});