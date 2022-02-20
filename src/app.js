require('dotenv').config(
      
);
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


require('./db/conn')




const Register = require('./models/registers');

const hbs = require('hbs');



const static_path = path.join(__dirname , "../public" );
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.urlencoded({extended:false}));

app.set('view engine' , 'hbs');
app.set('views' , viewsPath);


app.use(express.static(static_path));

hbs.registerPartials(partialsPath);

console.log(process.env.SECRET_KEY);


app.get('/', (req, res) => {


      res.render('index');
})

app.get('/register', (req, res) => {


      res.render('register');
})

app.get('/login',(req,res) => {

      res.render('login');
})

app.post('/register', async(req, res) => {

      try {
            
            const password = req.body.password;
            const cpassword = req.body.confirmpassword;

            if(password === cpassword)
            {
                 const registerEmployee = new Register({
                     
                  firstname:req.body.firstname,
                  lastname:req.body.lastname,
                  email:req.body.email,
                  gender:req.body.gender,
                  phone:req.body.phone,
                  age:req.body.age,
                  password:password,
                  confirmpassword:cpassword
                     
                 })  

      //token           
   
   
      
       const token = await registerEmployee.generateAuthToken();
        
         //password hash 




      const registered = await registerEmployee.save();
    
       
       
                 res.status(201).render("index");
            }
            else {

                   res.send('passwords are not matching')
            }


      }

      catch(error) {

             res.status(400).send(error);
             console.log('the error part page');

      }



     
})


app.post('/login', async(req, res) => {


       try {

            const email = req.body.email;
            const password = req.body.password;

            
            const userEmail = await Register.findOne({email:email})
          

          const isMatch = await bcrypt.compare(password, userEmail.password)  

          const token = await userEmail.generateAuthToken();

  
           console.log('token part ' + token);

            if(isMatch)
            {

                  res.status(201).render('index');
            }
            else {

                   res.send('invalid credentials')
            }


       }

       catch(err) {

             res.status(400).send('invalid credentials')

       }



})





// const securePassword = async (password) => {

//    const passwordHash = await bycrpt.hash(password, 10)

//    const passwordMatch = await bycrpt.compare('ar@123', passwordHash);

//    console.log(passwordHash);
//    console.log(passwordMatch)
// }


// securePassword("ar@123");





app.listen(port,() => {

     console.log(`server is running at port ${port}`);
})




