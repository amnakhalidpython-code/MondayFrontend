import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import BoardPage from './pages/BoardPage';
import TemplateBoardPage from './pages/TemplateBoardPage';
import WorkspacePage from './pages/WorkspacePage';
import DashboardLayout from './pages/DashboardLayout';
import DashboardHome from './pages/DashboardHome';

// WORKSPACE PAGES
import GrantsManagementPage from './pages/workspace/GrantsManagementPage';
import DonorManagementPage from './pages/workspace/DonorManagementPage';
import FundraisingPage from './pages/workspace/FundraisingPage';
import ProjectManagementPage from './pages/workspace/ProjectManagementPage';
import VolunteerPage from './pages/workspace/VolunteerPage';

// DOCS PAGES
import GrantsGettingStarted from './pages/docs/GrantsGettingStarted';
import DonorGettingStarted from './pages/docs/DonorGettingStarted';
import FundraisingGettingStarted from './pages/docs/FundraisingGettingStarted';

import { AuthProvider } from "./context/AuthContext";
import { BoardProvider } from "./context/BoardContext";
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
import CreateAccount13 from "./components/signup/signup13/CreateAccount13";
import CRMDashboard from "./pages/work-management/Dashboard/CRMDashboard";
import TemplateCenterPage from './components/templates/TemplateCenterPage';
import VolunteerLearningCenter from "./pages/docs/VolunteerLearningCenter";
import PMlearningCenter from "./pages/docs/ProjectManagementLearningCenter";

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
    "/twelve",
    "/thirteen",
    "/workspace",
    "/templates"
  ];

  // Check if current path starts with /dashboard, /boards, /workspaces, OR /docs
  const isDashboardRoute = 
    location.pathname.startsWith('/dashboard') || 
    location.pathname.startsWith('/boards') ||
    location.pathname.startsWith('/workspaces') ||
    location.pathname.startsWith('/docs'); // 🆕 ADDED
  
  const hideNavbar = hideNavbarRoutes.includes(location.pathname) || isDashboardRoute;

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
          element={
            <SignupProtectedRoute>
              <CreateAccountNine />
            </SignupProtectedRoute>
          } 
        />

        <Route 
          path="/ten" 
          element={
            <SignupProtectedRoute>
              <CreateAccountTen />
            </SignupProtectedRoute>
          } 
        />

        <Route 
          path="/eleven" 
          element={
            <SignupProtectedRoute>
              <CreateAccountEleven />
            </SignupProtectedRoute>
          } 
        />
        
        <Route
          path="/twelve"
          element={
            <SignupProtectedRoute>
              <CreateAccount12 />
            </SignupProtectedRoute>
          }
        />

        <Route
          path="/thirteen"
          element={
            <SignupProtectedRoute>
              <CreateAccount13 />
            </SignupProtectedRoute>
          }
        />

        {/* Dashboard with Sidebar - Nested Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
        </Route>

        {/* WORKSPACE ROUTES - Each workspace has its own page */}
        <Route path="/workspaces/:workspaceId" element={<DashboardLayout />}>
          <Route path="grants-management" element={<GrantsManagementPage />} />
          <Route path="donor-management" element={<DonorManagementPage />} />
          <Route path="fundraising" element={<FundraisingPage />} />
          <Route path="project-management" element={<ProjectManagementPage />} />
          <Route path="volunteer" element={<VolunteerPage />} />
        </Route>

        {/* 🆕 DOCS ROUTES - Getting Started Documentation Pages */}
        <Route path="/docs" element={<DashboardLayout />}>
          <Route path="grants-getting-started" element={<GrantsGettingStarted />} />
          <Route path="donor-getting-started" element={<DonorGettingStarted />} />
          <Route path="fundraising-getting-started" element={<FundraisingGettingStarted />} />
          <Route path="volunteer-getting-started" element={<VolunteerLearningCenter />} />
          <Route path="project-management-learning-center" element={<PMlearningCenter />} />
        </Route>

        {/* TEMPLATE BOARD ROUTE - For predefined templates */}
        <Route path="/boards/template/:templateId" element={<DashboardLayout />}>
          <Route index element={<TemplateBoardPage />} />
        </Route>

        {/* Board Page with Sidebar - For custom user boards */}
        <Route path="/boards/:boardId" element={<DashboardLayout />}>
          <Route index element={<BoardPage />} />
        </Route>

        <Route
          path="/templates"
          element={
            <TemplateCenterPage />
          }
        />

        <Route path="/workspace" element={<WorkspacePage />} />

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
      <BoardProvider>
        <Router>
          <AppContent />
        </Router>
      </BoardProvider>
    </AuthProvider>
  );
}

export default App;