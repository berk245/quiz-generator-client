import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Cookies from "js-cookie";
import LoginView from "./Views/Auth/LoginView";
import Dashboard from "./Views/Dashboard";
import SignupView from "./Views/Auth/SignupView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ProtectedRoute = () => {
  if (!Cookies.get("auth_token")) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

const PublicRoute = () => {
  if (Cookies.get("auth_token")) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LoginView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/signup" element={<SignupView />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route
            path="/*"
            element={
              <>
                <p>Not found</p>
              </>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
