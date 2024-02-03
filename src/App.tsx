import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginView from "./Views/Auth/LoginView";
import Dashboard from "./Views/Dashboard";
import SignupView from "./Views/Auth/SignupView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ProtectedRoute = () => {
  const user = "";
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/*" element={<LoginView />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
