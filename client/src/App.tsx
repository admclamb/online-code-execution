import { ThemeProvider } from "./features/theme/theme.provider";
import Layout from "./layout/layout";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <h1>TESTING</h1>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
