import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import FintechAnalysis from "./pages/Analyza/FintechAnalysis";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/blockchain/LandingPage";
import SignUp from "./pages/SignUPIN/SignUp";
import Login from "./pages/SignUPIN/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MojProfil from "./pages/MojProfil/MojProfil";
import { AuthProvider } from "./context/AuthContext";
import AnalysisHistory from "./pages/MojProfil/AnalysisHistory";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="bg-black min-h-screen flex flex-col justify-between">
      <AuthProvider>
        <Router>
          <Navbar />
          <div className="flex-grow p-6">
            {" "}
            {/* Added flex-grow to ensure content expands */}
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analyza" element={<FintechAnalysis />} />
              <Route path="/blockchain" element={<LandingPage />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/historia" element={<AnalysisHistory/>}/>
              <Route
                path="/moj-profil"
                element={
                  <ProtectedRoute>
                    <MojProfil />
                  </ProtectedRoute>
                }
              />
              <Route
            path="/analysis-history"
            element={
              <ProtectedRoute>
                <AnalysisHistory />
              </ProtectedRoute>
            }
          />
            </Routes>
          </div>
          {/* Add padding to content to ensure footer does not overlap */}
          <div className="pt-20">
            {" "}
            {/* Added top padding to ensure separation */}
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
