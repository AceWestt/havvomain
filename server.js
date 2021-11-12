const express = require('express');
const path = require('path');
const errorHandler = require('./middleware/error');

const app = express();

app.use(express.static(path.join(`${__dirname}/client`, 'build')));
app.get(/^\/(?!api).*$/, function (req, res) {
	res.sendFile(path.join(`${__dirname}/client`, 'build', 'index.html'));
});

app.use(errorHandler);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err}`);
	server.close(() => process.exit(1));
});
