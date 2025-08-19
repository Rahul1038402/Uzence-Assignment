import { cn } from "../utils/cn";
import { MenuIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = {
    name: string;
    href: string;
};

const navItems: NavItem[] = [
    { name: "Inputfield", href: "#inputfield" },
    { name: "Datatable", href: "#datatable" },
    { name: "Features", href: "#features" },
    { name: "Contact", href: "#contact" },
];

export const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed w-full z-40 transition-all duration-300",
                isMenuOpen
                    ? "bg-transparent py-5"
                    : isScrolled
                        ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
                        : "py-5"
            )}
        >
            <div className="container flex items-center justify-between">
                <div className="text-2xl text-primary flex items-centre">
                    <span className="relative z-10 text-gray-700 dark:text-gray-300">
                        <span className="text-purple-600 [text-shadow:0_0_6px_rgba(167,139,250,0.3)]"> Uzence's </span> Assignment
                    </span>
                </div>

                {/* Desktop */}
                <div className="hidden md:flex space-x-8 mr-8">
                    {navItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="text-foreground/80 hover:text-purple-600 transition-colors duration-200"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="md:hidden p-2 text-foreground z-50"
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                </button>

                {/* Mobile Menu */}
                <div
                    className={cn(
                        "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
                        "transition-all duration-300 md:hidden",
                        isMenuOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    )}
                >
                    <div className="flex flex-col space-y-8 text-xl">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-foreground/80 hover:text-purple-600 transition-colors duration-200"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>

                <ThemeToggle />
            </div>
        </nav>

    )
}
