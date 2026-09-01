//communicates with supabase

const { supabase, supabaseAdmin } = require("../../config/supabase");

//user created and there i also other option lke supabase.auth.signUp but it creates rate limit

//SIGN UP   //TODO: Change the create user method later
const registerUser = async (email, password) => {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true // Auto-confirms user, no email sent
    });

    if (error) throw error;
    return data;
};

//LOGIN
const loginUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        throw error;
    }

    return data;
};

//Authenticate user-Get User  -------""Backend, tell me who is currently logged in."

const getCurrentUser = async (accessToken) => {
    const { data, error } = await supabase.auth.getUser(accessToken);

    if (error) {
        throw error;
    }

    return data.user;
};

//REfresh Session if access token expires
const refreshSession = async (refreshToken) => {
    const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken
    });

    if (error) {
        throw error;
    }

    return data;
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    refreshSession
};
