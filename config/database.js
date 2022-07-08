require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGO_DB;

const connectionParams = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const connectDB = async () => {
	try {
		await mongoose.connect(url, connectionParams);
		console.log("Connected to database");
	} catch (error) {
		console.log("Error connection to DB", error);
		process.exit(1);
	}
};

module.exports = { connectDB };
