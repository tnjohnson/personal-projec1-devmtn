require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');
const bcrypt = require('bcrypt');
const ctrl = require('./controller');


app.use(bodyParser.json());
app.use(cors({
    credentials: true
}));

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

app.get('/logged_in_user', (req, res) => {
    if(!req.session.user) return res.status(401).send('Please Log in')
    return res.send(req.session.user)
})

app.get('/unassigned_jobs', ctrl.getUnassignedJobsDb);
app.get('/assigned_jobs', ctrl.getAssignedJobsDb);

app.post('/login', ctrl.loginToDb);
app.post('/sign_up', ctrl.signUp);

app.post('/my_jobs', ctrl.assignJob);


app.listen(SERVER_PORT, () => console.log(`Listening on Port: ${SERVER_PORT}`));