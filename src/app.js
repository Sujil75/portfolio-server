const express = require('express');

const portfolioRoutes = require('./modules/portfolio/routes/portfolio.routes');
const userRoutes = require('./modules/user/routes/user.routes');
const skillRoutes = require('./modules/skills/routes/skills.routes');
const educationRoutes = require('./modules/education/routes/education.routes');
const projectRoutes = require('./modules/projects/routes/project.routes');

const authMiddleware = require('./middleware/auth.middleware');

const app = express();

app.use(express.json());
// app.use(authMiddleware);

// app.get('/', (req, res) => {
//     res.send("Hello World!");
// });

// public api
app.use('/api/portfolio', portfolioRoutes);

// admin api
app.use(authMiddleware);
app.use('/api/admin/user', userRoutes);
app.use('/api/admin/skills', skillRoutes);
app.use('/api/admin/education', educationRoutes);
app.use('/api/projects', projectRoutes);

module.exports = app;