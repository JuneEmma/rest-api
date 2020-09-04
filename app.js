require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const postRoute = require('./routes/posts');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/posts', postRoute);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Homepage');
});

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('connected to db!')
);

app.listen(3000);
