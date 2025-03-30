import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './pages/App';
import ResultPage from './pages/result';  // Assuming 'result.tsx' is your result page

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/result/:shortUrl" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
