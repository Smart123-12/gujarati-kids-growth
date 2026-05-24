import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Auth } from './pages/Auth';
import { KidsHome } from './pages/KidsHome';
import { StoryLand } from './pages/StoryLand';
import { LearningRoom } from './pages/LearningRoom';
import { GamePark } from './pages/GamePark';
import { SanskarZone } from './pages/SanskarZone';
import { ParentDashboard } from './pages/ParentDashboard';
import { AdminPanel } from './pages/AdminPanel';
import { ChildNavbar } from './components/ChildNavbar';
import { VisualClassroom } from './pages/VisualClassroom';

// Gate to protect Kids paths (requires active child selected)
const KidsRoute = ({ children }) => {
  const { activeChild } = useApp();
  if (!activeChild) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="min-h-screen bg-kids-cream flex flex-col">
      <ChildNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

// Gate to protect Parent paths (requires parent login credentials)
const ParentRoute = ({ children }) => {
  const { parentUser } = useApp();
  if (!parentUser) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const RootRouter = () => {
  const { activeChild } = useApp();

  return (
    <Routes>
      {/* Home Route: Shows Auth if no active child selected, else Kids Home */}
      <Route 
        path="/" 
        element={activeChild ? (
          <div className="min-h-screen bg-kids-cream flex flex-col">
            <ChildNavbar />
            <KidsHome />
          </div>
        ) : <Auth />} 
      />

      {/* Protected Kids Routes */}
      <Route path="/stories" element={<KidsRoute><StoryLand /></KidsRoute>} />
      <Route path="/learning" element={<KidsRoute><LearningRoom /></KidsRoute>} />
      <Route path="/games" element={<KidsRoute><GamePark /></KidsRoute>} />
      <Route path="/sanskar" element={<KidsRoute><SanskarZone /></KidsRoute>} />
      <Route path="/classroom" element={<KidsRoute><VisualClassroom /></KidsRoute>} />

      {/* Protected Parent Route */}
      <Route path="/parent" element={<ParentRoute><ParentDashboard /></ParentRoute>} />

      {/* Admin Route */}
      <Route path="/admin" element={<AdminPanel />} />

      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <RootRouter />
      </Router>
    </AppProvider>
  );
}

export default App;
