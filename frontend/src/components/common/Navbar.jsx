import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#E8E1DA] bg-[#FFFDF9]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-xl font-bold text-[#D94A5A] sm:text-2xl"
        >
          Pinterest
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <Link
            to="/login"
            className="rounded-full px-3 py-2 text-sm font-semibold text-[#252525] transition hover:bg-[#F3A683]/20 sm:px-4"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="rounded-full bg-[#D94A5A] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#C83F50] sm:px-4"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;