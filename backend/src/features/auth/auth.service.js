//communicates with supabase

const { supabase, supabaseAdmin } = require("../../config/supabase");

//user created and there i also other option lke supabase.auth.signUp but it creates rate limit

const registerUser = async (email, password) => {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true // Auto-confirms user, no email sent
    });

    if (error) throw error;
    return data;
};

module.exports = {
    registerUser
};
