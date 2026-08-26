import Navbar from "../components/common/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#252525]">
      <Navbar />

      <main>{children}</main>
    </div>
  );
}

export default MainLayout;