const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./config/db');
const adminroutes = require('./routes/adminroutes');
const reportroutes = require('./routes/reportroutes');
const managerroutes = require('./routes/managerroutes');
const departmentRoutes = require('./routes/departmentRoutes');
const cors= require("cors");

connect();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:3001"}));

//routes
//route to register Admin HR
app.use('/admin',adminroutes);
//route for department
app.use('/department',departmentRoutes);
//routes for the manager
app.use('/manager',adminroutes);
//routes for the employees
app.use('/employees',adminroutes);
//routes for the reports
app.use('/reports',reportroutes);
//routes for the get employee under manager
app.use('/getEmployee',managerroutes);
//routes to get manager credentials
app.use('/profile',managerroutes);



//listening port to connect
app.listen(3000,()=>{
    console.log('server is running on http://localhost:3000/')
})