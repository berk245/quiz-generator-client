import { Chip } from "@mui/material";

export const ScoreChip = ({ score }: { score: string }) => {
  if (!score) return <></>;
  return (
    <Chip
      variant="outlined"
      label={` ⭐️ ${score} / 5`}
      color="info"
      size="small"
      sx={{
        fontSize: "0.75rem",
        flexBasis: "33%",
      }}
    />
  );
};
