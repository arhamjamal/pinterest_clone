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



module.exports = {
    registerUser,
    loginUser
};
