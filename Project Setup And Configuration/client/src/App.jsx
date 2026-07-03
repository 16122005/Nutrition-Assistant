// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './components/Home';
import Newplan from './pages/Plans/NewPlan';
import SuggestedNutrition from './pages/Plans/SuggestedNutrition';
import LandingPage from './pages/LandingPage';
import AdminPanel from './pages/Plans/NewSuggestion';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/suggestion" element={<Newplan />} />
        <Route path="/suggested-nutrition" element={<SuggestedNutrition />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};


export default App;

