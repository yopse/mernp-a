const mongoose = require('mongoose');


mongoose.connect(process.env.DB_NAME).then(()=>{
    console.log('Connection successfull')


}).catch(
    (err)=>{

        console.log(`Couldnt connect ` + err)
    }
)