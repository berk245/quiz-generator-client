import { Chip } from "@mui/material";

export const QuestionTypeChip = ({
  question_type,
}: {
  question_type: string;
}) => {
  const isMultiptleChioce = question_type === "multi";

  return (
    <Chip
      variant="outlined"
      label={isMultiptleChioce ? "Multiple choice" : "other type"}
      color={isMultiptleChioce ? "secondary" : "info"}
      size="small"
      sx={{
        fontSize: "0.75rem",
        flexBasis: "33%",
      }}
    />
  );
};
