import { Moon, Sun } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";

const ThemeToggle = () => {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:scale-110 transition"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
