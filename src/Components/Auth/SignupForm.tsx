import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSignupUser } from "../../Api/auth";
import { isValidEmail } from "./helpers";

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupErrorText, setSignupErrorText] = useState("");

  const { mutate: signupUser, isPending, isError } = useSignupUser();

  const resetErrors = () => {
    setEmailError("");
    setPasswordError("");
    setSignupErrorText("");
  };

  const handleSubmit = async () => {
    resetErrors();
    if (isInputValidated()) {
      signupUser(
        { email, password },
        {
          onError: (error) => {
            if (error.message === "Request failed with status code 409") {
              setSignupErrorText("Address already in use.");
            } else if (
              error.message === "Request failed with status code 400"
            ) {
              setSignupErrorText(
                "Invalid values. Please check the provided email address and make sure the password is longer than 6 characters."
              );
            } else {
              setSignupErrorText(error.message);
            }
          },
        }
      );
    }
  };

  const isInputValidated = () => {
    let isValid = true;
    if (!email.length || !isValidEmail(email)) {
      isValid = false;
      setEmailError("Please provide a valid email address.");
    } else if (email.length > 254) {
      isValid = false;
      setEmailError("This email is longer than accepted values.");
    }
    if (password.length < 6) {
      isValid = false;
      setPasswordError("Password should be at least 6 characters long.");
    } else if (password.length > 60) {
      isValid = false;
      setPasswordError("Password is too long.");
    }
    if (password !== passwordRepeat) isValid = false;
    return isValid;
  };

  return (
    <Box
      component="form"
      className="auth-form-box"
      noValidate
      autoComplete="off"
    >
      <TextField
        data-testid="signup-form-email-input"
        label="Email"
        variant="outlined"
        error={!isValidEmail(email)}
        helperText={emailError}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="signup-form-pwd-input">Password</InputLabel>
        <OutlinedInput
          data-testid="signup-form-pwd-input"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          error={
            passwordError.length > 0 ||
            (0 < password.length && password.length < 6)
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        <FormHelperText error={passwordError.length > 0}>
          {passwordError}
        </FormHelperText>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="signup-form-pwd-repeat-input">
          Repeat Password
        </InputLabel>
        <OutlinedInput
          data-testid="signup-form-pwd-repeat-input"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          error={passwordRepeat.length > 0 && password !== passwordRepeat}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {passwordRepeat.length !== 0 && password !== passwordRepeat && (
          <FormHelperText
            error={passwordRepeat.length !== 0 && password !== passwordRepeat}
          >
            Passwords do not match
          </FormHelperText>
        )}
      </FormControl>
      {isError && (
        <FormHelperText error className="auth-form-error-message">
          <span>{signupErrorText}</span>
        </FormHelperText>
      )}

      <LoadingButton
        data-testid="signup-button"
        variant="contained"
        loading={isPending}
        onClick={handleSubmit}
      >
        Sign up
      </LoadingButton>
    </Box>
  );
}

export default SignupForm;
