import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

export const ThemeToggle = () => {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedItem = localStorage.getItem("theme");

    if (storedItem === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (storedItem === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

        const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed top-5 right-16 md:top-4 md:right-2 z-50 p-2 rounded-full transition-all duration-300 focus:outline-hidden",isScrolled ? "py-0" : "py-2",
      )}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900" />
      )}
    </button>
  );
};
