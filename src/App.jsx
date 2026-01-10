import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"

// Pages & Components
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import PlatformShowcase from "./components/PlatformShowcase"
import Pricing from "./components/Pricing"
import { Testimonials, Footer } from "./components/Footer"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import VerifyEmail from "./pages/VerifyEmail"

// Functional Components
import OnboardingChat from "./components/OnboardingChat"
import Dashboard from "./components/Dashboard"
import CoursePlayer from "./pages/CoursePlayer"

function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-charcoal text-slate-900 dark:text-white selection:bg-lime-accent selection:text-charcoal relative transition-colors duration-300">
      <Navbar onLogin={() => navigate("/login")} />
      <main>
        <Hero />
        <Features />
        <PlatformShowcase />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <div className="min-h-screen bg-charcoal flex items-center justify-center text-white">Carregando...</div>

  if (!user) return <Navigate to="/login" />

  return children
}

// Wrapper to decide between Onboarding and Dashboard based on profile
function AppShell() {
  const { user, logout, updateProfile } = useAuth()

  // 1. Check Verification
  if (!user.is_verified) {
    return <VerifyEmail />
  }

  // 2. Check Profile (Onboarding)
  const handleOnboardingComplete = async (profile) => {
    await updateProfile(profile)
  }

  if (!user.profile) {
    return <OnboardingChat onComplete={handleOnboardingComplete} />
  }

  // 3. Authenticated, Verified, & Profiled -> Dashboard
  return <Dashboard user={user} onLogout={logout} />
}

import { ThemeProvider } from "./context/ThemeContext"

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthLoginRoute />} />
            <Route path="/register" element={<AuthRegisterRoute />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/app" element={
              <PrivateRoute>
                <AppShell />
              </PrivateRoute>
            } />

            <Route path="/player/:courseId" element={
              <PrivateRoute>
                <CoursePlayer />
              </PrivateRoute>
            } />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

// Wrappers to handle auth redirects if already logged in
function AuthLoginRoute() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  if (!loading && user) return <Navigate to="/app" />

  return <Login
    onToggleRegister={() => navigate("/register")}
    onLoginSuccess={() => navigate("/app")}
  />
}

function AuthRegisterRoute() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  if (!loading && user) return <Navigate to="/app" />

  return <Register
    onToggleLogin={() => navigate("/login")}
    onLoginSuccess={() => navigate("/app")}
  />
}

export default App
