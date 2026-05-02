const express = require('express');
const userRoutes = require('./modules/user/routes/user.routes');
const skillRoutes = require('./modules/skills/routes/skills.routes')
const authMiddleware = require('./middleware/auth.middleware')

const app = express();

app.use(express.json());
app.use(authMiddleware);

// app.get('/', (req, res) => {
//     res.send("Hello World!");
// });

app.use('/api/user', userRoutes);
app.use('api/skills', skillRoutes);

module.exports = app;