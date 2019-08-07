const bcrypt = require('bcrypt');

const getUnassignedJobsDb = async (req, res, next) => {
    try {
        let db = req.app.get('db')
        // console.log('check', db)
    let unassignedJobsDb = await db.get_unassigned_jobs();
    res.send(unassignedJobsDb);
    } 
    catch(error){
        console.log('error', error)
    }
}

const loginToDb = async (req, res, next) => {
    try {
        const db = req.app.get('db')
        const [user] = await db.users.find({ user_name: req.body.user_name });
        console.log('check', user, req)
        if (!user) return res.status(400).send('Please enter a valid Email and Password');

        console.log(req.body.password.toString() === user.password)
        const authenticated = req.body.password.toString() === user.password;
        // Eventually use below code, and get rid of of the two lines above. user.password will need
        //to be a hashed password. https://www.npmjs.com/package/bcrypt
        // const authenticated = await bcrypt.compare(req.body.password.toString(), user.password);
        if (!authenticated) return res.status(400).send('Please enter a valid Email and Password!!!');

        delete user.password;
        req.session.user = user;

        return res.send('Successfully Logged In!')
        
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

const signUp =  async (req, res, next) => {
    try {
        const db = req.app.get('db')

        const newUser = {
            user_name: req.body.user_name,
            password: req.body.password,
            user_role: 3,
            administrator: false
        }

        const user = await db.users.insert(newUser);
        delete user.password
        console.log(user)
        res.send(user)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUnassignedJobsDb,
    loginToDb,
    signUp,

}

// Above is the code I'm using, below is the testing front end code NOT NEEDED NOW THAT ABOVE WORKS
// const unassignedJobsDb = ['code', 'eat', 'test my code', 'see family'];

// const getUnassignedJobsDb = (req, res) => {
//     res.send(unassignedJobsDb);
// }
