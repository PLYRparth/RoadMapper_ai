import { Map } from "lucide-react";

const Navbar = () => {

    return (

        <header className="border-b bg-white">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                <div className="flex items-center gap-2">

                    <Map size={22} />

                    <h1 className="text-lg font-semibold">

                        Roadmapper AI

                    </h1>

                </div>

            </div>

        </header>

    );

};

export default Navbar;