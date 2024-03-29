import { Link } from "@mui/material";
import SignupForm from "../../Components/Auth/SignupForm";
import "./auth.css";

function SignupView() {
  return (
    <div className="auth-view-wrapper">
      <h3>Qgen</h3>
      <SignupForm />
      <div className="auth-form-link-container">
        <span>Already have an account?</span>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}

export default SignupView;
