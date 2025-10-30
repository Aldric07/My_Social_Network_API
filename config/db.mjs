import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connexion à MongoDB réussie');
  } catch (error) {
    console.error('Échec de la connexion à MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;
