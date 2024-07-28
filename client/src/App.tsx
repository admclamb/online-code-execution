import ThemeToggle from "./features/theme/theme-toggle";
import { ThemeProvider } from "./features/theme/theme.provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1>TESTING</h1>
      <ThemeToggle />
    </ThemeProvider>
  );
};

export default App;
