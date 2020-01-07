const express = require('express');
const connectDB = require('./config/db')
const {
  check,
  validationResult
} = require('express-validator/check');


const app = express();

connectDB();

// Init Middleware
app.use(express.json({
  extended: false
}))



app.get('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({
    min: 6
  })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array })
  }

  res.send('passed');
})

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));




const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});