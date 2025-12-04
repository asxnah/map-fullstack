import { useEffect, useState } from "react";
import { LuMoonStar, LuSun } from "react-icons/lu";

export const ThemeSwitcher = () => {
  const [isDark, setDark] = useState<boolean>(false);

  const switchTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const html = document.documentElement;

    const observer = new MutationObserver(() => {
      setDark(html.classList.contains("dark"));
    });

    observer.observe(html, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }, []);

  return (
    <button
      aria-label={isDark ? "Включить светлую тему" : "Включить темную тему"}
      className="absolute top-2 left-2 z-99 p-3 bg-[#212529] hover:bg-[#343a40] dark:bg-[#f8f9fa] dark:hover:bg-[#e9ecef] transition duration-300 ease-in-out rounded-full"
      onClick={switchTheme}
    >
      {isDark ? (
        <LuSun aria-hidden={true} color="#212529" size="24px" />
      ) : (
        <LuMoonStar aria-hidden={true} color="#f8f9fa" size="24px" />
      )}
    </button>
  );
};
