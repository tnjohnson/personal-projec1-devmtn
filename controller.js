const bcrypt = require("bcrypt");

const getUnassignedJobsDb = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send("Please Log in");
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
    if (!req.session.user) return res.status(401).send("Please Log in");
    let db = req.app.get("db");

    let gotAssignedJobsDb = await db.get_assigned_jobs({
      userId: req.session.user.id
      // what am I doing here with the userId?  I forget.
    });

    
    res.send(gotAssignedJobsDb);
  } catch (error) {
    console.log("Error", error);
    res.status(500).send(error);
  }
};

const getUserList = async (req, res, next) => {
  try {
    const db = req.app.get("db");
    let userList = await db.get_user_list();
    res.send(userList);
    // console.log('User List Check',userList)
  } catch (error) {
    console.log("Error", error);
    res.status(500).send(error);
  }
}

const getAccomplishedJobsDb = async (req, res, next) => {
  try {
    // console.log(req.session.user)
    if (!req.session.user) return res.status(401).send("Please Log in");
    let db = req.app.get("db");

    let gotAccomplishedJobsDb = await db.get_accomplished_jobs();
    res.send(gotAccomplishedJobsDb);

  } catch (error) {
    console.log("Error", error);
    res.status(500).send(error);
  }
}

const getNotesDB = async (req, res, next) => {
  try {
    const db = req.app.get("db");
    let noteList = await db.get_note_list();
    res.send(noteList);
  } catch (error) {
    console.log("Error", error);
    res.status(500).send(error)
  }
}



const assignJob = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send("Please Log in");
    // To Do : check permissions!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const db = req.app.get("db");
    const userId = req.body.userId;
    const jobId = req.body.jobId;
    let assignedJobsDb = await db.assign_job_to_user({ userId, jobId });
    res.send(assignedJobsDb);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const loginToDb = async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const [user] = await db.users.find({ user_name: req.body.user_name });
    // console.log("check", user);
    if (!user)
      return res.status(400).send("Please enter a valid User Name and Password");

    const results = await bcrypt.compare(req.body.password, user.password);
    if (!results)
      return res.status(403).send("Please enter a valid User Name and Password!!!");

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
    // console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const addJob = async (req, res, next) => {
  try {
    // To Do: check permissions.  Kind of does this b/c the div doesn't render without Admin being equal to True.  Check to see if more protection is needed.
    const db = req.app.get("db");

    const newJob = {
      job_title: req.body.newJob,
      description: req.body.newDescription,
      notes: "",
      assigned_user: null,
      completed: false
    };
    // console.log(newJob);
    const addJobToDb = await db.jobs.insert(newJob);
    // console.log("This was added to the DB:", addJobToDb);
    res.send(addJobToDb);
  } catch (error) {
    console.log(error);
    res.status(406).send(error);
  }
};

const assignJobAmin = async (req, res, next) => {
  try {
    if (!req.session.user) return res.status(401).send("Please Log in");
    const db = req.app.get("db");
    const userId = req.body.userId;
    const jobId = req.body.jobId;

    const assignedJob = await db.assign_job_to_user({userId, jobId})
    res.send(assignedJob);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

const addNote = async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const jobId = req.body.jobId;
    const newNote = req.body.newNote;

    const savedNoteToDb = await db.add_note({ jobId, newNote })
    res.send(savedNoteToDb);

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

const removeJobAdmin = async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const jobId = req.params.id;
    await db.remove_job_admin({ jobId })
    res.send('Successfully Deleted');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

const completeJob = async (req, res, next) => {
  try {
    const db = req.app.get("db");
    const jobId = req.params.id;
    await db.complete_job({ jobId });
    res.status(202).send('Successfully Completed!  Good Job Working my Minion!')
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = {
  signUp,
  loginToDb,
  getUnassignedJobsDb,
  getAssignedJobsDb,
  getAccomplishedJobsDb,
  getNotesDB,
  addJob,
  assignJob,
  getUserList,
  assignJobAmin,
  removeJobAdmin,
  addNote,
  completeJob
};
