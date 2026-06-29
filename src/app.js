const express = require('express');
const cors = require('cors');

const portfolioRoutes = require('./modules/portfolio/routes/portfolio.routes');
const userRoutes = require('./modules/user/routes/user.routes');
const skillRoutes = require('./modules/skills/routes/skills.routes');
const educationRoutes = require('./modules/education/routes/education.routes');
const projectRoutes = require('./modules/projects/routes/project.routes');
const contactRoutes = require('./modules/contact/routes/contact.routes');
const adminRoutes = require('./modules/admin/routes/admin.routes');
const viewerContactRoutes = require('./modules/viewerContact/routes/viewerContact.routes');
const viewerContactAdminRoutes = require('./modules/viewerContact/routes/viewerContactAdmin.routes');

const authMiddleware = require('./middleware/auth.middleware');
const errMiddleware = require('./middleware/errMiddleware');

const app = express();

app.use(express.json());
app.use(cors());

// public api
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/portfolio/viewercontact', viewerContactRoutes);

// Admin Auth Routes
app.use('/api/admin/auth', adminRoutes);

// admin api
app.use('/api/admin', authMiddleware);
app.use('/api/admin/user', userRoutes);
app.use('/api/admin/skills', skillRoutes);
app.use('/api/admin/educations', educationRoutes);
app.use('/api/admin/projects', projectRoutes);
app.use('/api/admin/contacts', contactRoutes);
app.use('/api/admin/viewercontact', viewerContactAdminRoutes);

app.use(errMiddleware);

module.exports = app;