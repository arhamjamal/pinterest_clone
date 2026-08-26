import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#E5E5E5] bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-2xl font-bold text-[#E60023]"
        >
          Pinterest
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-sm font-semibold text-[#111111] transition hover:bg-[#F7F7F7]"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="rounded-full bg-[#E60023] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c5001f]"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;