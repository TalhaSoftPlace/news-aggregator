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
            <Route
              key={id}
              path={"/"}
              element={<News category={"general"} country={"us"} />}
            />
            <Route path="/search/:query" element={<Search />} />
          </Routes>
        </ErrorBoundary>
      </ToastProvider>
    </Router>
  );
}

export default App;
