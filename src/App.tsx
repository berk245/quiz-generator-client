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

const ProtectedRoute = () => {
  const user = "";
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

function App() {
  return (
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
  );
}

export default App;
