require('dotenv').config()

const Task = require("../models/task.js");
const User = require("../models/user.js")

//----------------------- Add Task -----------------------
const addTask = async (request, response) => {
    try {
        const { name } = request.body;
        const user = await User.findById({ _id: request.user.id });
        if (!user) {
            return response.status(400).send({ status: false, message: 'User NOT Found' });
        }

        // creates an instance of task model
        const task = new Task({ name, user: user._id });
        await task.save();

        user.tasks.push(task._id);
        await user.save();

        return response.status(200).send({ status: true, message: 'Task Added Successfully' });
    } catch (error) {
        console.log('Error add-------------------', error);
        return response.status(400).send({ status: false, message: 'Error in Adding Task' });
    }
}

//----------------------- Get Tasks -----------------------
const getTasks = async (request, response) => {
    try {
        const user = await User.findById({ _id: request.user.id });
        if (!user) {
            return response.status(400).send({ status: false, message: 'User NOT Found' });
        }

        const tasks = user.tasks;
        let tasksNames = [];

        for (let i = 0; i < tasks.length; i++) {
            let task = await Task.findById({ _id: tasks[i] });
            tasksNames.push(task.name);
        }
        return response.status(200).json({ status: true, tasks: tasksNames });
    } catch (error) {
        console.log('Error read-------------------', error);
        return response.status(400).send({ status: false, message: 'Error in get Task' });
    }
};


//----------------------- Update Tasks -----------------------
const updateTask = async (request, response) => {
    try {
        console.log('update-------------------');
        const taskId = request.params.id;
        const { newName } = request.body;
        const user = await User.findById({ _id: request.user.id });
        const task = await Task.findById({ _id: taskId });

        if (!user) {
            return response.status(400).send({ status: false, message: 'User NOT Found' });
        }
        if (!newName) {
            return response.status(400).send({ status: false, message: 'Input field is Empty' });
        }
        if (!task) {
            return response.status(400).send({ status: false, message: 'Task NOT Found' });
        }
        if (task.user != user.id) {
            return response.status(400).send({ status: false, message: 'User have NO Access to update this task' });
        }
        const taskData = await Task.findByIdAndUpdate({ _id: taskId }, {
            $set: {
                name: newName,
            }
        })

        return response.status(200).send({ status: true, message: 'Task Updated Successfully' });
    } catch (error) {
        console.log('Error read-------------------', error);
        return response.status(400).send({ status: false, message: 'Error in updating Task' });
    }
};

//----------------------- Delete Task -----------------------
const deleteTask = async (request, response) => {
    try {
        console.log('delete-------------------');
        const taskId = request.params.id;
        const user = await User.findById({ _id: request.user.id });
        const task = await Task.findById({ _id: taskId });
        if (!user) {
            return response.status(400).send({ status: false, message: 'User NOT Found' });
        }
        if (!task) {
            return response.status(400).send({ status: false, message: 'Task NOT Found' });
        }
        if (task.user != user.id) {
            return response.status(400).send({ status: false, message: 'User have NO Access to delete this task' });
        }
        taskArray = user.tasks;
        await Task.deleteOne({ _id: taskId });
        const index = taskArray.indexOf(taskId);

        console.log('index-----------------', index);

        const x = taskArray.splice(index, 1);

        console.log(`myArray values: ${taskArray}`);
        console.log(`variable x value: ${x}`);

        return response.status(200).send({ status: true, message: 'Task Deleted Successfully' });
    } catch (error) {
        console.log('Error read-------------------', error);
        return response.status(400).send({ status: false, message: 'Error in deleting Task' });
    }
};

module.exports = {
    addTask,
    getTasks,
    updateTask,
    deleteTask
}