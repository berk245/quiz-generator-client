import { Link } from '@mui/material'
import SignupForm from '../../Components/Auth/SignupForm'
import './auth.css'

function SignupView() {
  return (
    <div className="auth-view-wrapper">
    <h3>Quiz Generator</h3>
    <SignupForm />
    <div className="auth-form-link-container">
      <span>Already have an account?</span>
      <Link href="/signup">Login</Link>
    </div>
  </div>
  )
}

export default SignupView
