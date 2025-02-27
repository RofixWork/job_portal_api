import { connect } from "mongoose";

const connectDB = async (uri) => {
    try {
        await connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        throw new Error(error);
    }
}

export default connectDB;