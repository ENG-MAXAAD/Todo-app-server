const User = require('../../models/authentication/user');

const createUser = async (req, res) => {
    try {
        const { name, phone, password, email } = req.body;
        const user = await User({
            name: name,
            phone: phone,
            password: password,
            email: email,

        }).save();

        res.status(200).json({ status: 'success', data: user });

    } catch (err) {

        res.status(401).json({ status: 'Failed to create user', message: err.toString() });
    }
}
const getUsers = async (req, res) => {
    try {
    
        const users = await User.find();

        res.status(200).json({ status: 'success', data: users });

    } catch (err) {

        res.status(401).json({ status: 'Failed to fetching users', message: err.toString() });
    }
}
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ status: 'success', data: user });

    } catch (err) {

        res.status(401).json({ status: 'Failed to fetching users', message: err.toString() });
    }
}
const updateUser = async (req, res) => {
    try {
        // Find the user by ID and update
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // If the user is not found, return a 404 error
        if (!user) {
            return res.status(404).json({ status: 'User not found', message: 'No user found with the given ID' });
        }

        // Return the updated user data
        res.status(200).json({ status: 'success', data: user });

    } catch (err) {
        // Handle any errors that occur during the update process
        res.status(400).json({ status: 'Failed to update user', message: err.message });
    }
};


const deleteUser = async (req, res) => {
    try {
        let result;

        // Check if an ID is provided in the URL parameters
        if (req.params.id) {
            // Delete user by ID
            result = await User.deleteOne({ _id: req.params.id });
            if (result.deletedCount > 0) {
                res.status(200).json({ status: 'successfully deleted', message: `User with ID ${req.params.id} deleted` });
            } else {
                res.status(404).json({ status: 'No user found', message: `No user found with ID ${req.params.id}` });
            }
        } else {
            // Delete all users if no ID is provided
            result = await User.deleteMany({});
            if (result.deletedCount > 0) {
                res.status(200).json({ status: 'successfully deleted', message: `${result.deletedCount} user(s) deleted` });
            } else {
                res.status(404).json({ status: 'No users found', message: 'No users were deleted' });
            }
        }
    } catch (error) {
        res.status(401).json({ status: 'Failed to delete user(s)', message: error.toString() });
    }
};




module.exports = { createUser , getUsers, getUser, deleteUser, updateUser};



