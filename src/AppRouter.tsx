import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import ResultPage from "./pages/result";
import RedirectPage from "./components/RedirectPage";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/result/:shortUrl" element={<ResultPage />} />
        <Route path="/:shortenedlink" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
