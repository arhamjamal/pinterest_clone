//handles http request

const authService = require("./auth.service");

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const data = await authService.registerUser(email, password);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: data.user
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    register
};