import { Heart } from "lucide-react";
import githubLogo from "../../assets/github.png";

const Footer = () => {
    return (
        <footer className="mt-24 border-t border-white/[0.08] bg-[#09090B]">
            <div className="mx-auto flex max-w-[1360px] flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:px-8 lg:px-10 xl:px-12">

                <p className="flex items-center gap-2">
                    Made with
                    <Heart
                        size={14}
                        className="fill-red-500 text-red-500"
                    />
                    by
                    <span className="font-medium text-white">
                        Parth Singhal
                    </span>
                </p>

                <a
                    href="https://github.com/PLYRparth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/[0.05] hover:text-white"
                >
                    <img
                        src={githubLogo}
                        alt="GitHub"
                        className="h-4 w-4 object-contain"
                    />
                </a>

            </div>
        </footer>
    );
};

export default Footer;