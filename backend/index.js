const express = require('express')
const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors')
const path = require('path');
var bodyParser = require('body-parser')
const userroutes = require("./routes/users");
const authroutes = require("./routes/auth");
const postroutes = require("./routes/posts");

dotenv.config(); 
const PORT = process.env.PORT;

mongoose .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
          })   
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));

//middleware
app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet()); 
app.use(morgan("common"));




app.use("/api/users",userroutes); 
app.use("/api/auth",authroutes); 
app.use("/api/posts",postroutes); 

app.get('/', (req, res) => { 
  res.send('GET request to the homepage')
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => 
    console.log(`App listening on port http://localhost:${PORT}/ `)
) 