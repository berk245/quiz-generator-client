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
import QuizzesView from "./Views/Quizzes";
import QuizDetailsView from "./Views/QuizDetails";
import CreateQuizView from "./Views/CreateQuiz";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GenerateQuestionsView from "./Views/GenerateQuestions";
import NotFoundView from "./Views/NotFound";

const isUserSignedIn = Cookies.get("auth_token") ? true : false;

const ProtectedRoute = () => {
  if (!isUserSignedIn) return <Navigate to="/" replace />;
  return <Outlet />;
};

const PublicRoute = () => {
  if (isUserSignedIn) return <Navigate to="/dashboard" replace />;
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
            <Route path="/quizzes/*" element={<QuizzesRoutes />} />
          </Route>

          <Route path="/*" element={<NotFoundView />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

const QuizzesRoutes = () => (
  <Routes>
    <Route index element={<QuizzesView />} />
    <Route path="/new" element={<CreateQuizView />} />
    <Route path="/:quizId" element={<QuizDetailsView />} />
    <Route path="/:quizId/generate" element={<GenerateQuestionsView />} />
  </Routes>
);

export default App;
