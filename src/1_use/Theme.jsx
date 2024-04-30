import { createContext, useState, use } from "react";

const ThemeContext = createContext(null);

const ThemeProvider = (props) => {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, themeToggler }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

const ThemeComponent = () => {
  const { theme, themeToggler } = use(ThemeContext);

  const cls = theme === "dark" ? "themeContainer dark" : "themeContainer";

  return (
    <div className={cls}>
      <h3>BACKGROUND</h3>
      <button onClick={themeToggler}>change theme</button>
    </div>
  );
};

export const ThemeExample = () => {
  return (
    <ThemeProvider>
      <ThemeComponent />
    </ThemeProvider>
  );
};
