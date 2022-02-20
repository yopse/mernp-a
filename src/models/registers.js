const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const employeeSchema = new mongoose.Schema({
   
       firstname:{
           type:String,
           required:true
        },
        
        lastname:{

            type:String,
            required:true
        }
        ,

        email:{
            type:String,
            required:true,
            unique:true


        },

        gender:{
            type:String,
            required:true
             
        },

        phone:{
         
            type:Number,
            required:true


        },
        age:{
           type:Number,
           required:true
             
        },

        password:{
           
         type:String,
         required:true
        },

        confirmpassword:{

             type:String,
             required:true
        },

        tokens:[
             {
                 token:{
                      type:String,
                      required:true
                 }
             }
        ]



});

//generating tokens


employeeSchema.methods.generateAuthToken = async function() {

      
    
    const token = await jwt.sign({_id:this._id}, process.env.SECRET_KEY)
  
    this.tokens = await this.tokens.concat({token:token})
     return token;
}










employeeSchema.pre("save" , async function(next){


     if(this.isModified('password')) {
        
        this.password = await bcrypt.hash(this.password,10);
      
        this.confirmpassword = await bcrypt.hash(this.password,10);
     }

     

     next();

   
})

// creating a a collection

const Register = new mongoose.model('Register', employeeSchema);

module.exports = Register;


