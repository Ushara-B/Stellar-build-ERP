const Leave = require("../models/LeaveModel");

const getLeave = (req, res, next) => {
  Leaveeave.find()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ massage: error });
    });
};

const addLeave = (req, res, next) => {
  const leave = new Leave({
    emp_id: req.body.emp_id,
    date: req.body.date,
    type: req.body.type,
    reason: req.body.reason,
  });
  leave
    .save()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const updateLeave = (req, res, next) => {
  const { emp_id, date, reason } = req.body;
  Leave.updateOne({ emp_id: emp_id }, { $set: { date: date, reason: reason } })
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const deleteLeave = (req, res, next) => {
  const emp_id = req.body.emp_id;
  Leave.deleteOne({ emp_id: emp_id })
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

exports.getLeave = getLeave;
exports.addLeave = addLeave;
exports.updateLeave = updateLeave;
exports.deleteLeave = deleteLeave;
