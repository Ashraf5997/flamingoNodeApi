
const express       =   require('express');
const bodyParser    =   require('body-parser');
const cors          =   require('cors');
const app           =   express();
const createHttpError = require('http-errors')
var   router = express.Router();
const path          =   require("path");
require('dotenv').config()
const port =   process.env.PORT_NUMBER;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const swaggerUI= require("swagger-ui-express");
const YAML = require("yamljs");

const adminserviceswaggerJsdoc = YAML.load("./apiDoc/adminservice.yaml"); // adminservice
app.use( "/apiDoc/adminservice" , swaggerUI.serve,swaggerUI.setup(adminserviceswaggerJsdoc))

//const commonserviceswaggerJsdoc = YAML.load("./apiDoc/commonservice.yaml"); // commonservice
//app.use( "/apiDoc/commonservice" , swaggerUI.serve,swaggerUI.setup(commonserviceswaggerJsdoc) )

// SERVICES
const commonService              =   process.env.commonServiceBaseUrl ;
const adminService               =   process.env.adminServiceBaseUrl ;

// COMMON MODULE ROUTES
const accessRoutes       =   require('./src/Modules/commonModule/routes/accessRoutes');
const cartRoutes         =   require('./src/Modules/commonModule/routes/cartRoutes');
const orderRoutes        =   require('./src/Modules/commonModule/routes/orderRoutes');
const delvryAdrsRoutes   =   require('./src/Modules/commonModule/routes/addressRoutes');
// ADMIN MODULE ROUTES
const invoiceRoutes      =   require('./src/Modules/adminModule/routes/invoiceRoutes');
const userRoutes         =   require('./src/Modules/adminModule/routes/userMngRoutes');
const prodCtgryRoutes    =   require('./src/Modules/adminModule/routes/prodCtgryRoutes');
const productRoutes      =   require('./src/Modules/adminModule/routes/productRoutes');
const serviceAddRoutes   =   require('./src/Modules/adminModule/routes/serviceAddressRoutes');
const adminOrderRoutes   =   require('./src/Modules/adminModule/routes/orderRoutes');
  
//============ WELCOME TO HOME  ===============
app.use("/server",(req,res)=>{
    res.end("<h1 style='text-align:center;color:white;background-color:red'>Welcome to flamingo.in server </h1>")
})
app.use('/profile/picture',express.static('picUpload/proPics'));
app.use('/product/picture',express.static('picUpload/productPics'));
app.use('/category/picture',express.static('picUpload/ctgryPics'));

// COMMON MODULE  ROUTES  EXECUTIONS 
app.use(commonService,accessRoutes);        //   ACCESS MANAGEMENT ROUTES
app.use(commonService,cartRoutes);          //   CART MANAGEMENT ROUTES
app.use(commonService,delvryAdrsRoutes);    //   DELIVERY ADDRESS MANAGEMENT ROUTES
app.use(commonService,orderRoutes);         //   ORDER MANAGEMENT ROUTES

// ADMIN MODULE ROUTES EXECUTION
app.use(adminService,invoiceRoutes);   //   INVOICE  MANAGEMENT ROUTES
app.use(adminService,userRoutes);      //   USER MANAGEMENT ROUTES
app.use(adminService,prodCtgryRoutes); //   PRODUCT CATEGORY  MANAGEMENT ROUTES
app.use(adminService,productRoutes)    //   PRODUCT MANAGEMENT ROUTES
app.use(adminService,serviceAddRoutes) //   SERVICE ADDRESS MANAGEMENT ROUTES
app.use(adminService,adminOrderRoutes) //   ORDER MANAGEMENT ROUTES

//  DEFAULT ROUTER ERROR
/*app.use((req,res,next)=>{
  next(createHttpError.NotFound())
})
app.use((error,req,res,next)=>{
    error.status = error.status || 500
    res.status(error.status);
    res.send(error)
})*/

// SERVER STARTING 
app.use(express.static(path.join(__dirname,'public')));
app.listen(port,()=>{
    console.log(" SERVER IS RUNNING ON PORT : "+port);
})

