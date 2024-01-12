const Users = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateToken = (id, role) => {
    const token = jwt.sign({ id, role }, process.env.SECRET_KEY, { expiresIn: '1d' });
    return token;
}

const register = async (req, res) => {
    const { fullName, email, password, phoneNumber, role } = req.body;
    try {
        if (!fullName || !email || !password || !phoneNumber || !role)
            throw Error("All fields must be filled!");

        const existEmail = await Users.findOne({ email });
        if (existEmail) throw Error("Email already in use");
        
        if (!phoneNumber) throw Error("Phone number is required");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await Users.create({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            role
        });

        const token = generateToken(user._id, role);

        res.status(200).json({ message: "User added successfully",user,token,id:user._id });
    } catch (error) {
        res.status(500).json({ message: "Failed to add ann user", error: error.message });
    }
};

module.exports = {
     register,
};