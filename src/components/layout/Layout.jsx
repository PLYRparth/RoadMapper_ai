import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      <main className="mx-auto w-full max-w-[1360px] px-5 pb-16 pt-6 sm:px-8 lg:px-10 lg:pt-8 xl:px-12">
        {children}
      </main>

       <Footer />
    </div>
  );
};

export default Layout;
