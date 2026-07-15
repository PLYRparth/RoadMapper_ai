import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">

      <main className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-10 xl:px-12">
        <Navbar />

        {children}

      </main>

    </div>
  );
};

export default Layout;