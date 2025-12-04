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
      className="absolute top-2 left-2 z-99 py-3 px-3 dark:bg-[#f8f9fa] dark:text-[#212529] text-[#f8f9fa] dark:hover:bg-[#e9ecef] hover:bg-[#343a40] transition duration-300 ease-in-out bg-[#212529] rounded-full"
      onClick={switchTheme}
    >
      {isDark ? (
        <LuSun color="#212529" size="24px" />
      ) : (
        <LuMoonStar color="#f8f9fa" size="24px" />
      )}
    </button>
  );
};
