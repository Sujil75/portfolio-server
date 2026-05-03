const express = require('express');

const portfolioRoutes = require('./modules/portfolio/routes/portfolio.router');
const userRoutes = require('./modules/user/routes/user.routes');
const skillRoutes = require('./modules/skills/routes/skills.routes');
const educationRoutes = require('./modules/education/routes/education.routes');

const authMiddleware = require('./middleware/auth.middleware');

const app = express();

app.use(express.json());
// app.use(authMiddleware);

// app.get('/', (req, res) => {
//     res.send("Hello World!");
// });

// public api
app.use('/api/portfolio', portfolioRoutes);

module.exports = app;