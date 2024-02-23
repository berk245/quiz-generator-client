import { Grid } from "@mui/material";
import { type ResponseSourceType } from ".";

export const SourcesList = ({ sources }: { sources: ResponseSourceType[] }) => {
  return (
    <Grid
      container
      direction="column"
      sx={{
        display: "flex",
        gap: "0.75rem",
        fontSize: "0.9rem",
        padding: "0.25rem 0.25rem 0.25rem 0",
        overflow: "auto",
      }}
    >
      <strong>Sources</strong>

      {sources.map((source, index) => {
        return (
          <span key={index}>
            {index + 1}) {source.file_name}
          </span>
        );
      })}
    </Grid>
  );
};
