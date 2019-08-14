const bcrypt = require("bcrypt");

const getUnassignedJobsDb = async (req, res, next) => {
  try {
    if(!req.session.user) return res.status(401).send('Please Log in')
    let db = req.app.get("db");
    // console.log('check', db)
    let unassignedJobsDb = await db.get_unassigned_jobs();
    res.send(unassignedJobsDb);
  } catch (error) {
    console.log("error", error);
    res.status(500).send(error);
  }
};

const getAssignedJobsDb = async (req, res, next) => {
  try {
    if(!req.session.user) return res.status(401).send('Please Log in')
    let db = req.app.get("db");

    let gotAssignedJobsDb = await db.get_assigned_jobs({userId: req.session.user.id});
    console.log(gotAssignedJobsDb);
    res.send(gotAssignedJobsDb);
  } catch (error) {
    console.log('Error', error);
    res.status(500).send(error);
  }
}

const assignJob = async (req, res, next) => {
  try {
    if(!req.session.user) return res.status(401).send('Please Log in')
    // To Do : check permissions
    const db = req.app.get("db");
    const userId = req.body.userId;
    const jobId = req.body.jobId;
    let assignedJobsDb = await db.assign_job_to_user({userId, jobId});
    res.send(assignedJobsDb);
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

const loginToDb = async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const [user] = await db.users.find({ user_name: req.body.user_name });
    // console.log("check", user);
    if (!user)
      return res.status(400).send("Please enter a valid Email and Password");

    const results = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!results)
      return res.status(403).send("Please enter a valid Email and Password!!!");

    delete user.password;
    req.session.user = user;

    return res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const signUp = async (req, res, next) => {
  try {
    const db = req.app.get("db");

    const hash = await bcrypt.hash(req.body.password, 10);

    const newUser = {
      user_name: req.body.user_name,
      password: hash,
      user_role: 3,
      administrator: false
    };

    const user = await db.users.insert(newUser);
    delete user.password;
    console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getUnassignedJobsDb,
  loginToDb,
  signUp,
  assignJob,
  getAssignedJobsDb
};

