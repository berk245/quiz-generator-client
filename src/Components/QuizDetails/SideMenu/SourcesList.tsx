import { Grid } from "@mui/material";

export interface ResponseSourceType {
  created_at: string;
  file_hash: string;
  file_name: string;
  source_id: number;
}

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
      <strong>Teaching Material</strong>

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
