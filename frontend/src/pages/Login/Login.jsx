import { Link } from "react-router-dom";
import LoginForm from "../../features/auth/components/LoginForm";

function Login() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#FFFDF9] px-4 py-10">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-lg ring-1 ring-[#E8E1DA] sm:p-10">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#D94A5A] text-2xl font-bold text-white">
                        P
                    </div>

                    <h1 className="text-3xl font-bold text-[#252525]">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-sm text-[#77706A]">
                        Log in to continue exploring ideas.
                    </p>
                </div>

                <LoginForm />

                <p className="mt-6 text-center text-sm text-[#77706A]">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-semibold text-[#D94A5A] transition hover:text-[#C83F50]"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;