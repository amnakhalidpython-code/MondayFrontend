import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { SignupProtectedRoute } from "./utils/ProtectedRoute";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";

// Pages
import WorkManagementPage from "./pages/work-management/WorkManagementBasicPage";
import SignUp from "./components/signup/singupfirst/SignUp";
import CreateAccountSecond from "./components/signup/signup2/CreateAccountSecond";
import CreateAccountThird from "./components/signup/signup3/CreateAccountThird";
import CreateAccountForth from "./components/signup/signup4/CreateAccountForth";
import CreateAccountFifth from "./components/signup/signup5/CreateAccountFifth";
import CreateAccountSixth from "./components/signup/signup6/CreateAccountSixth";
import CreateAccountSeven from "./components/signup/signup7/CreateAccountSeven";
import CreateAccountEight from "./components/signup/signup8/CreateAccountEight";
import CreateAccountNine from "./components/signup/signup9/CreateAccountNine";
import CreateAccountTen from "./components/signup/signup10/CreateAccountTen";
import CreateAccountEleven from "./components/signup/signup11/CreateAccountElev";
import CreateAccount12 from "./components/signup/signup12/CreateAccount12";

// Navbar ko conditionally hide karne ke liye separate component
function AppContent() {
  const location = useLocation();
  
  // Pages jahan Navbar hide krna hai
  const hideNavbarRoutes = [
    "/one",
    "/two",
    "/three",
    "/four",
    "/five",
    "/six",
    "/seven",
    "/eight",
    "/nine",
    "/ten",
    "/eleven",
    "/twelve"
  ];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Navbar conditionally show/hide */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Pages WITH Navbar */}
        <Route path="/" element={<WorkManagementPage />} />
        <Route path="/w/work-management" element={<WorkManagementPage />} />

        {/* Signup Page - PUBLIC (No Protection) */}
        <Route path="/one" element={<SignUp />} />

        {/* Protected Signup Steps */}
        <Route 
          path="/two" 
          element={
            <SignupProtectedRoute>
              <CreateAccountSecond />
            </SignupProtectedRoute>
          } 
        />
        
        <Route 
          path="/three" 
          element={
            <SignupProtectedRoute>
              <CreateAccountThird />
            </SignupProtectedRoute>
          } 
        />
        
        <Route 
          path="/four" 
          element={
            <SignupProtectedRoute>
              <CreateAccountForth />
            </SignupProtectedRoute>
          } 
        />
        
        <Route 
          path="/five" 
          element={
            <SignupProtectedRoute>
              <CreateAccountFifth />
            </SignupProtectedRoute>
          } 
        />
        
        <Route 
          path="/six" 
          element={
            <SignupProtectedRoute>
              <CreateAccountSixth />
            </SignupProtectedRoute>
          } 
        />
        
        <Route 
          path="/seven" 
          element={
            <SignupProtectedRoute>
              <CreateAccountSeven />
            </SignupProtectedRoute>
          } 
        />
        
        <Route 
          path="/eight" 
          element={
            <SignupProtectedRoute>
              <CreateAccountEight />
            </SignupProtectedRoute>
          } 
        />
        
        <Route 
          path="/nine" 
          element={<CreateAccountNine />}
        />

        <Route 
          path="/ten" 
          element={<CreateAccountTen/>}
          
        />

        <Route 
          path="/eleven" 
          element={<CreateAccountEleven/>}
          
        />
        <Route
          path="/twelve"
          element={<CreateAccount12/>}
        />

      </Routes>
      

    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;