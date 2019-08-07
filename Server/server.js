require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');
const bcrypt = require('bcrypt');
const ctrl = require('./controller');


app.use(bodyParser.json());
app.use(cors());

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(
    session({
        secret: SESSION_SECRET,
        saveUninitialized: false
    })
);

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})
.catch(error => console.log('error', error));

app.get('/unassignedJobs', ctrl.getUnassignedJobsDb);

app.post('/', ctrl.loginToDb);
app.post('/signUp', ctrl.signUp);


app.listen(SERVER_PORT, () => console.log(`Listening on Port: ${SERVER_PORT}`));