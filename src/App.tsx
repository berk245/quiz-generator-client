import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import AuthView from "./Views/Auth";
import Dashboard from "./Views/Dashboard";

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
        <Route path="/" element={<AuthView />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/*" element={<AuthView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
