import { Cancel } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

export const KeywordTag = ({
  tagName,
  handleTagDelete,
}: {
  tagName: string;
  handleTagDelete: (value: string) => void;
}) => {
  return (
    <Box
      sx={{
        background: "#1976d2",
        borderRadius: "5px",
        width: "max-content",
        height: "100%",
        display: "flex",
        padding: "0.25rem 0.75rem",
        margin: "0 0.5rem 0 0",
        justifyContent: "center",
        alignContent: "center",
        color: "#ffffff",
      }}
    >
      <Stack direction="row" alignItems={"center"} gap={1}>
        <Typography fontSize={"0.8rem"}>{tagName}</Typography>
        <Cancel
          sx={{
            cursor: "pointer",
          }}
          onClick={() => {
            handleTagDelete(tagName);
          }}
        />
      </Stack>
    </Box>
  );
};
