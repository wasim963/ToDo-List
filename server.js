const express = require('express');
const srv=express();

const apiRoute=require('./routes/api');

srv.use(express.json());
srv.use(express.urlencoded({extended:true}));

srv.use('/api',apiRoute);

srv.use('/public',express.static(__dirname + '/public_html'));

srv.listen(8888,function () {
    console.log("Server Started on port 8888");
});