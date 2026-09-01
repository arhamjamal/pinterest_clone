const authService = require("./auth.service");

const authMiddleware = async (req, res, next) => {
    try {
        const accessToken = req.cookies.access_token;

        // No access token
        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        // --------------------------------
        // 1. Try existing access token
        // --------------------------------
        try {
            const user = await authService.getCurrentUser(accessToken);

            req.user = user;
            return next();

        } catch (error) {
            console.log("Access token validation failed:", error.message);

            // We assume the access token is invalid/expired
            // and continue to refresh below.
        }

        // --------------------------------
        // 2. Access token failed → refresh
        // --------------------------------
        const refreshToken = req.cookies.refresh_token;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Session expired",
            });
        }

        let data;

        try {
            data = await authService.refreshSession(refreshToken);
        } catch (error) {
            console.error("Refresh session error:", error);

            // Refresh token is no longer usable
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");

            return res.status(401).json({
                success: false,
                message: "Session expired. Please login again.",
            });
        }

        if (!data?.session) {
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");

            return res.status(401).json({
                success: false,
                message: "Session expired. Please login again.",
            });
        }

        // --------------------------------
        // 3. Save new tokens
        // --------------------------------
        res.cookie("access_token", data.session.access_token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: data.session.expires_in * 1000,
        });

        res.cookie("refresh_token", data.session.refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        // --------------------------------
        // 4. Get user using new token
        // --------------------------------
        try {
            const user = await authService.getCurrentUser(
                data.session.access_token
            );

            req.user = user;

            return next();

        } catch (error) {
            console.error(
                "Failed to get user after token refresh:",
                error
            );

            res.clearCookie("access_token");
            res.clearCookie("refresh_token");

            return res.status(500).json({
                success: false,
                message: "Authentication service temporarily unavailable",
            });
        }

    } catch (error) {
        // --------------------------------
        // Unexpected server error
        // --------------------------------
        console.error("Authentication middleware error:", error);

        return res.status(500).json({
            success: false,
            message: "Authentication service temporarily unavailable",
        });
    }
};

module.exports = authMiddleware;