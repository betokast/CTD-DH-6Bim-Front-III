import { useTheme } from "./hooks/useTheme";

import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

function App() {

  const { theme } = useTheme()

  return (
    <>
      <div className={`app ${theme}}`}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
