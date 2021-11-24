const mongoose = require('mongoose');

const certPath = '../env/mongodb.pem';

const connect = () => {
  mongoose
    .connect(
      'mongodb+srv://kandesk:kandeskPass@cluster0.wmuod.mongodb.net/SurveyPlatform'
    )
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => {
      throw new Error(`MongoDB error: ${err.message}`);
    });
};

const disconnect = async () => {
  await mongoose.disconnect();
};

module.exports = { connect, disconnect };
