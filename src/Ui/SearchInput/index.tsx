import React, { useState } from "react";
import Box from "@mui/material/Box";
import { InputProps } from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import { Cancel, CancelOutlined, SearchOutlined } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

interface SearchInputProps extends InputProps {
  labelText?: string;
  variant?: "standard" | "outlined" | "filled";
  onValueChange: (e: string) => void;
}

export default function SearchInput({
  labelText = "Search",
  variant = "standard",
  onValueChange,
  className,
  size = "small",
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(e.target.value);
    onValueChange(e.target.value);
  };

  const resetSearchTerm = () => {
    setSearchTerm("");
    onValueChange("");
  };

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }} className={className}>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <TextField
          id="input-with-sx"
          label={labelText}
          variant={variant}
          onChange={onChange}
          value={searchTerm}
          placeholder="Search..."
          size={size}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {searchTerm && (
                  <Cancel
                    onClick={resetSearchTerm}
                    sx={{ cursor: "pointer" }}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
