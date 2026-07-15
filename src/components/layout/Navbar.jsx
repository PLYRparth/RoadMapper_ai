import {
  NavLink,
} from "react-router";

const Navbar = () => {

  return (

    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#09090bcc] backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-10">

        <NavLink
          to="/dashboard"
          className="text-2xl font-bold tracking-tight tracking-tight"
        >

          Roadmapper AI

        </NavLink>

        <nav className="flex items-center gap-8">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "rounded-xl px-4 py-2 transition-all hover:bg-zinc-800"
                : "text-zinc-400 hover:rounded-xl px-4 py-2 transition-all hover:bg-zinc-800"
            }
          >

            Dashboard

          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "rounded-xl px-4 py-2 transition-all hover:bg-zinc-800"
                : "text-zinc-400 hover:rounded-xl px-4 py-2 transition-all hover:bg-zinc-800"
            }
          >

            Settings

          </NavLink>

        </nav>

      </div>

    </header>

  );

};

export default Navbar;