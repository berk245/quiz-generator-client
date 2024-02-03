import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fetchingData, setFetchingData] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setFetchingData(true);
    console.log(email, password);
    setTimeout(() => {
      setFetchingData(false);
      navigate("/dashboard");
    }, 5000);
  };

  return (
    <Box
      component="form"
      className="auth-form-box"
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
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
      </FormControl>

      <LoadingButton
        variant="contained"
        loading={fetchingData}
        onClick={handleSubmit}
      >
        Login
      </LoadingButton>
    </Box>
  );
}

export default LoginForm;
