const bcrypt = require('bcrypt');
const User = require('../../models/authentication/user');

// Create User
const createUser = async (req, res) => {
    try {
        const { name, phone, password, email } = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the saltRounds

        // Save user with hashed password
        const user = await new User({
            name,
            phone,
            password: hashedPassword,
            email,
        }).save();

        res.status(200).json({ status: 'success', data: user });

    } catch (err) {
        res.status(401).json({ status: 'Failed to create user', message: err.toString() });
    }
}

// Get All Users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: 'success', data: users });

    } catch (err) {
        res.status(401).json({ status: 'Failed to fetching users', message: err.toString() });
    }
}

// Get Single User
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ status: 'success', data: user });

    } catch (err) {
        res.status(401).json({ status: 'Failed to fetching user', message: err.toString() });
    }
}

// Update User
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
        res.status(401).json({ status: 'Failed to update user', message: err.toString() });
    }
}

// Delete User
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ status: 'User not found', message: 'No user found with the given ID' });
        }

        res.status(200).json({ status: 'success', message: 'User deleted successfully' });

    } catch (err) {
        res.status(401).json({ status: 'Failed to delete user', message: err.toString() });
    }
}

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ status: 'Failed', message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ status: 'Failed', message: 'Invalid email or password' });
        }

        // Return success if password matches
        res.status(200).json({
            status: 'Success',
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                photo: user.photo,
            }
        });

    } catch (err) {
        res.status(500).json({ status: 'Error', message: 'Server error', error: err.toString() });
    }
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    loginUser
};
