//communicates with supabase
const { createClient } = require("@supabase/supabase-js"); //for avoding shared client for refresh session
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

//Refresh Session if access token expires
const refreshSession = async (refreshToken) => {
    const refreshClient = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_PUBLISHABLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    );

    const { data, error } = await refreshClient.auth.refreshSession({
        refresh_token: refreshToken
    });

    if (error) {
        throw error;
    }

    return data;
};

//logout user---!NOT USED PRIMARIRLY IN CONTROLLER
// const logoutUser = async () => {
//     const { error } = await supabase.auth.signOut();

//     if (error) {
//         throw error;
//     }
// };

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    refreshSession,
    // logoutUser
};
