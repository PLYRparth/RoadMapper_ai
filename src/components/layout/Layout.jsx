import Navbar from "./Navbar";

const Layout = ({ children }) => {

    return (

        <>

            <Navbar />

            <main className="mx-auto max-w-6xl p-6">

                {children}

            </main>

        </>

    );

};

export default Layout;