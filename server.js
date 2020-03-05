const express = require('express');
const path = require('path');
const root = __dirname + '/build'
const apiMocker = require('mocker-api');
const port = process.env.LEANCLOUD_APP_PORT || 3000

const app = express();

app.use(express.static(root,{maxAge:86400000}))
apiMocker(app, path.resolve('./mocker/mocker.js'))

app.listen(port,()=>{
    console.log('server is runnig ')
})