const mongoose = require('mongoose');

const username = 'doadmin';
const password = 'Y10fTuP5r8639wH7';
const dbName = 'admin';
const host = 'private-dbaas-db-61850-710f2d2e.mongo.ondigitalocean.com';

const mongodbProdUri = `mongodb+srv://${username}:${password}@${host}/${dbName}`;

const options = {
	ssl: true,
	sslValidate: true,
	sslCA: `${__dirname}/havvo-ca-certificate.crt`,
};

const connectDB = async () => {
	await mongoose.connect(process.env.MONGO_URI || (mongodbProdUri, options));
	console.log('MongoDB connected');
};

module.exports = connectDB;
