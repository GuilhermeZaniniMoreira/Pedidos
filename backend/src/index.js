const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();
const app = express();

mongoose.connect(`mongodb+srv://guilherme:${process.env.PASSWORD}@cluster0-n9hqi.mongodb.net/Sances?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
