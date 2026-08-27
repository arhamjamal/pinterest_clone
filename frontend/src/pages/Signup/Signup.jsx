import { Link } from "react-router-dom";
import SignupForm from "../../features/auth/components/SignupForm";

function Signup() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#FFFDF9] px-4 py-10">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-lg ring-1 ring-[#E8E1DA] sm:p-10">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#D94A5A] text-2xl font-bold text-white">
                        P
                    </div>

                    <h1 className="text-3xl font-bold text-[#252525]">
                        Create your account
                    </h1>

                    <p className="mt-2 text-sm text-[#77706A]">
                        Join Pinterest and start discovering ideas.
                    </p>
                </div>

                <SignupForm />

                <p className="mt-6 text-center text-sm text-[#77706A]">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-[#D94A5A] transition hover:text-[#C83F50]"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;