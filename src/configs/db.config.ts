import mongoose, { MongooseError } from "mongoose";
import "dotenv/config";
const connectMongoDB = async () => {
	try {
		const databaseUri = process.env.NODE_ENV === "PRODUCTION" ? process.env.DB_URI! : process.env.DB_LOCAL_URI!;
		mongoose.set("strictQuery", true);
		await mongoose.connect(databaseUri);
		console.log("Connected to database");
	} catch (error: MongooseError | any) {
		console.log(error.message);
	}
};

export default connectMongoDB;
