import { Link } from "@mui/material";
import LoginForm from "../../Components/Auth/LoginForm";
import "./auth.css";

function LoginView() {
  return (
    <div className="auth-view-wrapper">
      <h3>Welcome to Qgen</h3>
      <p>
        Your platform for generating quiz questions with the power of AI.
        <br />
      </p>
      <LoginForm />
      <div className="auth-form-link-container">
        <span>Don't have an account?</span>
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default LoginView;
