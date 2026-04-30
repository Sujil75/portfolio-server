const app = require('./app');
require('dotenv').config();
const dns = require('dns');
const connectDB = require('./config/dbConnection');
const { start } = require('repl');

dns.setServers(["0.0.0.0", "1.1.1.1"]);

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running at localhost:${PORT} `);
        });
    }catch(err) {
        console.log('Server failed to start: ', err.message);
    };
};

startServer();