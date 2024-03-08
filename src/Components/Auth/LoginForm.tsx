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

  const {
    mutate: loginUser,
    data,
    isPending,
    isError,
    error,
    isSuccess,
  } = useLoginUser();

  const handleSubmit = () => {
    if (isInputValidated()) {
      console.log("Input calidated");
      loginUser({ email: email, password: password });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") loginUser({ email: email, password: password });
  };

  const isInputValidated = () => {
    setEmailError("");
    setPasswordError("");
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
        id="outlined-basic"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        error={emailError.length > 0}
        helperText={emailError}
        required
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
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
      </FormControl>

      <LoadingButton
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
