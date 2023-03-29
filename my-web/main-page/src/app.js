const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const helmet = require('helmet');

const Logger = require('bunyan');

const log = new Logger({
    name: 'logger',
    streams: [{
         level: 'info',
         stream: process.stdout
    }]
});

const root_routes = require("./routes/root_routes")(log);

//EXPRESS
const app = express();

//For POST and PUT requests (req.body)
app.use(bodyParser.json());

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Securing app with helmet, recommended practice by Express
app.use(
    //Executing drive videos.
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            mediaSrc: ["'self'", "https://drive.google.com", "https://doc-04-6k-docs.googleusercontent.com/", "https://doc-04-2g-docs.googleusercontent.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            scriptSrcElem: ["'self'", "'unsafe-inline'"]
        }
    })
);

//LIBS paths
app.use('/lib/three/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/lib/three/examples/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));

//CSS paths
app.use('/css', express.static(__dirname + '/public/css'));

//JS paths
app.use('/js', express.static(__dirname + '/public/js'));

//IMG paths
app.use('/img', express.static(__dirname + '/public/img'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//ENDPOINTS
app.use('/', root_routes);

app.listen(process.env.PORT, () => {
    console.log('Express is running on port ' + process.env.PORT + ' at ' + Date());
});