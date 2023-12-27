const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const productRoutes= require('./routes/product')
const orderRoutes= require('./routes/order')
const cartRoutes= require('./routes/cart')
const reviewRoutes= require('./routes/review')
const imageRoutes= require('./routes/image')
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const WebSocketServer = require('ws');
const expressStatusMonitor = require('express-status-monitor');

const app = express();
const { swaggerUi, specs } = require('./swagger');
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
const PORT = process.env.PORT || 3005;
app.use('/public', express.static('public'))

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', async () => {
  console.log('Connected to MongoDB');
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});

app.use(session({ secret: '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', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
 passport.use(
  new GoogleStrategy(
    {
      clientID: '815662093826-r5nonbtal3r861d29hd8ib3jlqmkbtg1.apps.googleusercontent.com ',
      clientSecret: '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',
      callbackURL: 'http://localhost:3005/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      
      User.findOne({ googleId: profile.id }, (err, existingUser) => {
        if (err) {
          return done(err);
        }

        if (existingUser) {
          
          return done(null, existingUser);
        }

        const newUser = new User({
          googleId: profile.id,
          displayName: profile.displayName,
          
        });

        newUser.save((err) => {
          if (err) {
            return done(err);
          }

          return done(null, newUser);
        });
      });
    }
  )
);

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    
    res.redirect('/cart');
  }
);

app.use('/admin', limiter);
app.use('/users', limiter);
app.use('/product', limiter);
app.use('/order', limiter);


app.use('/admin', adminRoutes);
app.use('/users', userRoutes);
app.use('/product',productRoutes);
app.use('/order', orderRoutes);
app.use('/cart', cartRoutes);
app.use('/review',reviewRoutes );
app.use('/images', imageRoutes)

const wss = new WebSocketServer.Server({ port: 3001 })
 
wss.on("connection", ws => {
  console.log("new client connected");
  ws.send('Welcome, you are connected!');
  ws.on("message", data => {
      console.log(`Client has sent us: ${data}`)
  });
  ws.on("close", () => {
      console.log("the client has connected");
  });
  ws.onerror = function () {
      console.log("Some Error occurred")
  }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
const swaggerUiOptions = {
  configUrl: false,
  customCss: '.swagger-ui .topbar { display: none }',
};

app.use(expressStatusMonitor({ 
  title: 'My App Status', 
  path: '/status', 
  spans: [
    {
      interval: 1, 
      retention: 60 
    }
  ]
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  module.exports = app


