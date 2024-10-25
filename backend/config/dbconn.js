const mongoose = require('mongoose')

// connect to mongodb
const connectDB = async() => {
      
          const connection = await mongoose.connect("mongodb+srv://sharmilau25:q3LkvIVvAPrea59e@cluster0.tiy2g.mongodb.net/recipemanager")
            .then(() => console.log('MongoDB connected successfully'))
            .catch(err => console.error('MongoDB connection error:', err))
            console.log("connection=>",connection);
}

module.exports = connectDB