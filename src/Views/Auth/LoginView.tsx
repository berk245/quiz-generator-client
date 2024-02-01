import { Link } from "@mui/material";
import LoginForm from "../../Components/Auth/LoginForm";
import "./auth.css";

function LoginView() {
  return (
    <div className="auth-view-wrapper">
      <h3>Quiz Generator</h3>
      <LoginForm />
      <div className="auth-form-link-container">
        <span>Don't have an account?</span>
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default LoginView;
