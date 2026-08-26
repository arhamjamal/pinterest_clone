import Navbar from "../components/common/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navbar />

      <main>{children}</main>
    </div>
  );
}

export default MainLayout;