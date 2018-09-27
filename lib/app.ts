import * as express from 'express';
import * as bodyParser from 'body-parser'
import * as cookieparser from 'cookie-parser'
import * as session from 'express-session';
import * as passport from 'passport';

//Importing MiddleWares
import responseTemplate from './middlewares/response'
 
// importing Routes
import  apiRoutes from './routes/api-routes'


//create express
const app = express();

//body parser implement
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// implement cookieparser
app.use(cookieparser());

//DB Connection
require('./configDb/db-config');

//setup cors handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// use response template
app.use(responseTemplate);

//setUp Api routes
app.use('/api/todo', apiRoutes)

//set the home route
app.get('/', (req: any, res: any) => {
    res.status(200).send("Root / Working...");
});

// Error handling
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Something broke!');
});




export default app;

