import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { router } from "./config/config";
import { useId } from "react";
import Search from "./components/Search/Search";
import { News } from "./components/News/News";
import ErrorBoundary from "./components/hoc/ErrorBoundary";
import ToastProvider from "./components/hoc/ToastProvider";

function App() {
  const id = useId();
  return (
    <Router>
      <ToastProvider>
        <NavBar />
        <ErrorBoundary>
          <Routes>
            {router.map((path) => (
              <Route
                key={id}
                path={path.path}
                element={
                  <News
                    key={path.key}
                    category={path.category}
                    country={path.country}
                  />
                }
              />
            ))}
            <Route path="/search/:query" element={<Search />} />
          </Routes>
        </ErrorBoundary>
      </ToastProvider>
    </Router>
  );
}

export default App;
