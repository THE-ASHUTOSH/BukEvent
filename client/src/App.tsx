
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-purple"></div></div>;
  }
  return user && isAdmin ? <>{children}</> : <Navigate to="/login" />;
};

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-purple"></div></div>;
  }
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <EventProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen bg-brand-dark text-brand-light font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </EventProvider>
    </AuthProvider>
  );
};

export default App;
