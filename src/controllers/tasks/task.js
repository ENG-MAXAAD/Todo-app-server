const Task = require('../../models/tasks/task');

const createTask = async (req, res) => {
    try {
        const { task_name, description, assigned_to, due_date, priority_level, status } = req.body;

        const task = await new Task({
            task_name,
            description,
            assigned_to,
            due_date,
            priority_level,
            status
        }).save();

        res.status(201).json({ status: 'Task created successfully', data: task });
    } catch (err) {
        console.error(err);
        res.status(400).json({ status: 'Failed to create task', message: err.toString() });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ status: 'success', data: tasks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Failed to get tasks', message: err.toString() });
    }
};

const getTask =  async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        res.status(200).json({ status: 'success', data: task });

    }catch (err) {
        res.json({ status: 'failed to get task', message: err.toString() });
    };
}

const updateTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ status: 'success', data: task });

    }catch (err) {
        res.json({ status: 'failed to update task', message: err.toString() });
    };
};


const deleteTask =async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.json({ status: 'failed to delete task', message: 'No task found with the given ID' });
        }

        res.status(200).json({ status: 'successfully deleted task', data: task });

    }catch (err) {
        res.json({ status: 'failed to delete task', message: err.toString() }); 
    };
}





module.exports = { createTask, getTasks, getTask, updateTask, deleteTask};