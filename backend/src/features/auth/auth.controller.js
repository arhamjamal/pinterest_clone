//handles http request

const authService = require("./auth.service");

//SIGN UP
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

//LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const data = await authService.loginUser(email, password);
       

        res.cookie("access_token", data.session.access_token, {
            httpOnly: true, 
            secure: false,    //**false in dev, true in prod */
            sameSite: "lax",
            maxAge: data.session.expires_in * 1000  //milliseconds
        });

        res.cookie("refresh_token", data.session.refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: data.user
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

//GET CURRENT USER
const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};


//logout-BY CLEARING TOKENS from cookies
const logout = async (req, res) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.status(200).json({
            success: true,
            message: "Logout successful"
        });

    } catch (error) {
        console.error("Logout error:", error);

        res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
};

module.exports = {
    register,
    login,
    getMe,
    logout
};