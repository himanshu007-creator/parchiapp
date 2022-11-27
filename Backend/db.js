const mongoose = require('mongoose')

module.exports = async function DBonnection(){
    try{
        const connParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
        await mongoose.connect(process.env.DBURI)
        console.log("Database connected")
    }
    catch{
        console.log("Error connecting")

    }
}