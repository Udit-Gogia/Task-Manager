const express = require("express");
const Task = require("../models/task");
const router = new express.Router();
const auth = require("../middleware/auth");

router.get("/tasks/:title", auth, async (req, res) => {
  try {
    await req.user.populate({ path: "tasks" });
    const searchTask = await req.user.tasks.filter((task) =>
      task.title.toLowerCase().includes(req.params.title)
    );
    res.send(searchTask);
  } catch (e) {
    console.log("encountered an error you noob!!");
  }
});

router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const [toSortBy, order] = req.query.sortBy.split("-");
    sort[toSortBy] = order === "asc" ? 1 : -1;
  }

  if (req.query.status) {
    console.log({ status: req.query.status })
    match["status"] = req.query.status;
  }

  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });

    return res.status(200).send(req.user.tasks);
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Error while loading tasks", code: "taskErr" });
  }
});

router.get("/task/:_id", auth, async (req, res) => {
  const task = await Task.findOne({
    _id: req.params._id,
    author: req.user._id,
  });

  try {
    if (task) {
      return res
        .status(200)
        .send({ task, msg: "Task found", code: "task-fd-success" });
    }
    res.status(404).send({ msg: "Task not found", code: "task-fd-failure" });
  } catch (e) {
    res
      .status(500)
      .send({ msg: "Error while finding task", code: "task-fd-sysfail" });
  }
});

router.post("/tasks", auth, async (req, res) => {
  const repTask = await Task.findOne({
    title: req.body.title,
    author: req.user._id,
  });

  try {
    if (repTask) {
      return res.status(409).send({
        err,
        msg: "A task with same title already exists",
        code: "dupTask",
      });
    } else {
      const task = new Task({ ...req.body, author: req.user._id });
      await task.save();
      return res.status(201).send({
        task,
        msg: "Task created successfully",
        code: "task-cr-success",
      });
    }
  } catch (err) {
    res
      .status(400)
      .send({ err, msg: "Unable to post a task", code: "noNewTask" });
  }
});

router.patch("/task/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!task) {
      return res.status(404).send({
        err: "Task not updated",
        msg: "Task not found",
        code: "task-up-failure",
      });
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send({
      task,
      msg: "Task updated successfully",
      code: "task-up-success",
    });
  } catch (err) {
    res.status(500).send({
      err: "Task not updated",
      msg: "Task could not be updated",
      code: "task-up-sysfail",
    });
  }
});

router.delete("/task/:id", auth, async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    author: req.user._id,
  });

  try {
    if (!task) {
      return res.status(404).send({
        err: "Task could not be deleted",
        msg: "No task found to be deleted",
        code: "task-dl-failure",
      });
    }

    res.send({ msg: "Task Deleted Successfully", code: "task-dl-success" });
  } catch (err) {
    res.status(500).send({
      err: "Unable to delete task",
      msg: "System error while failing the task",
      code: "task-dl-sysfail",
    });
  }
});

module.exports = router;
