import { NavLink } from "react-router";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#09090b]/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-5 sm:px-8 lg:px-10 xl:px-12">
        <NavLink
          to="/dashboard"
          className="group inline-flex items-center gap-3 transition-all duration-200"
        >
          <img
            src={logo}
            alt="Roadmapper AI"
            className="h-9 w-9 rounded-xl object-contain"
          />
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-white">
              Roadmapper AI
            </span>

            <span className="text-xs text-zinc-500 transition-colors duration-200 group-hover:text-zinc-400">
              AI Learning Companion
            </span>
          </div>
        </NavLink>

        <nav className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-sm"
                : "rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-sm"
                : "rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white"
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
