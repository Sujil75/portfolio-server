const express = require('express');
const userRoutes = require('./modules/user/routes/user.routes');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//     res.send("Hello World!");
// });

app.use('/api/user')

module.exports = app;