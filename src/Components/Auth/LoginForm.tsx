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
import { useLoginUser } from "../../Api/auth";
import { isValidEmail } from "./helpers";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginErrorText, setLoginErrorText] = useState("");

  const { mutate: loginUser, isPending, isError } = useLoginUser();

  const handleSubmit = () => {
    if (isInputValidated()) {
      loginUser(
        { email: email, password: password },
        {
          onError: (error) => {
            if (error.message === "Request failed with status code 404") {
              setLoginErrorText("Incorrect username password combination.");
            } else {
              setLoginErrorText(error.message);
            }
          },
        }
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const isInputValidated = () => {
    setEmailError("");
    setPasswordError("");
    let isValid = true;
    if (!email.length || !isValidEmail(email)) {
      isValid = false;
      setEmailError("Please provide a valid email address.");
    }
    return isValid;
  };

  return (
    <Box
      component="form"
      className="auth-form-box"
      noValidate
      autoComplete="off"
      onKeyDown={handleKeyDown}
    >
      <TextField
        data-testid="login-form-email-input"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        error={emailError.length > 0}
        helperText={emailError}
        required
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="login-form-password-input">Password</InputLabel>
        <OutlinedInput
          data-testid="login-form-password-input"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError.length > 0}
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
        {isError && (
          <FormHelperText error={true}>{loginErrorText}</FormHelperText>
        )}
      </FormControl>

      <LoadingButton
        data-testid="login-button"
        variant="contained"
        loading={isPending}
        onClick={handleSubmit}
      >
        Login
      </LoadingButton>
    </Box>
  );
}

export default LoginForm;
