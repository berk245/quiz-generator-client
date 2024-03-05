import { Chip } from "@mui/material";

import { capitalize } from "lodash-es";

type ChipColor =
  | "primary"
  | "info"
  | "warning"
  | "default"
  | "secondary"
  | "error"
  | "success";

export const DifficultyChip = ({ difficulty }: { difficulty: string }) => {
  let chipColor: ChipColor = "primary";

  switch (difficulty) {
    case "easy":
      chipColor = "primary";
      break;
    case "medium":
      chipColor = "warning";
      break;
    case "hard":
      chipColor = "error";
      break;
  }
  if (!difficulty) return <></>;
  return (
    <Chip
      variant="outlined"
      label={capitalize(difficulty)}
      color={chipColor}
      size="small"
      sx={{
        fontSize: "0.75rem",
        flexBasis: "33%",
      }}
    />
  );
};
