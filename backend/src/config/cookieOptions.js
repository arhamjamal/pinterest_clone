const isProduction = process.env.NODE_ENV === "production";  //checks if app is in development or production


const accessTokenCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
};

const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
};

module.exports = {
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
};