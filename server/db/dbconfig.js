import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectdb;