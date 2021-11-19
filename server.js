require('dotenv').config({ path: './config.env' });
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const connectDB = require('./db');
const errorHandler = require('./middleware/error');
global.__basedir = __dirname;
global.__clientdir = `${__basedir}/client/public`;
global.__uploadRoot = '/api/public';

connectDB();

const app = express();
app.use(express.static(path.join(`${__dirname}/client`, 'build')));
app.get(/^\/(?!api).*$/, function (req, res) {
	res.sendFile(path.join(`${__dirname}/client`, 'build', 'index.html'));
});

app.use(express.json());
app.use(fileUpload());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/mainscreen', require('./routes/mainscreen'));
app.use('/api/aboutscreen', require('./routes/aboutscreen'));
app.use('/api/othersscreen', require('./routes/othersscreen'));
app.use('/api/products', require('./routes/product'));
app.use('/api/locations', require('./routes/locations'));
app.use('/api/public', express.static('client/public'));

app.use(errorHandler);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err}`);
	server.close(() => process.exit(1));
});
