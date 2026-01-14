import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Team from './pages/Team';
import Events from './pages/Events';
import Join from './pages/Join';
import Chatbot from './components/Chatbot';

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMembers from './pages/admin/AdminMembers';
import AdminEvents from './pages/admin/AdminEvents';

// Layout for public pages that includes Navbar and Footer
const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-dark)] text-[var(--text-main)] font-[var(--font-main)]">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Routes - Protected by AdminLayout logic */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="events" element={<AdminEvents />} />
          </Route>

          {/* Public Routes */}
          <Route path="/*" element={
            <PublicLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/events" element={<Events />} />
                <Route path="/join" element={<Join />} />
              </Routes>
            </PublicLayout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
