import { Grid, Typography, Button } from "@mui/material";
import React from "react";
import { GetApp, AddCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { QuestionType } from "../../../types";
import { useExportQuestions } from "../../../Api/questions";
import { LoadingButton } from "@mui/lab";

interface QuestionsHeaderProps extends React.PropsWithChildren {
  questions: QuestionType[];
}

export const QuestionsHeader = ({
  questions,
  children,
}: QuestionsHeaderProps) => {
  const { mutate: exportToCSV, isPending } = useExportQuestions();

  const formatExportData = () => {
    return questions.map((question) => {
      const { question_text, correct_answer, multiple_choices } = question;
      return { question_text, correct_answer, multiple_choices };
    });
  };

  return (
    <Grid
      container
      direction="row"
      sx={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flexBasis: "10%",
      }}
    >
      <Grid
        item
        xs={5}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: { xs: "0.75rem", lg: "1.25rem" },
        }}
        alignItems="center"
      >
        <Typography sx={{ fontSize: { xs: "1.25rem", lg: "1.5rem" } }}>
          Questions
        </Typography>
        <Link to="generate">
          <Button variant="contained" data-testid="generate-questions-btn">
            <AddCircle sx={{ marginRight: "0.5rem" }} />
            <Typography
              variant="subtitle2"
              sx={{
                display: { xs: "none", lg: "block" },
                textTransform: "none",
              }}
            >
              Generate Questions
            </Typography>
          </Button>
        </Link>
      </Grid>

      <Grid
        item
        xs={7}
        justifyContent="flex-end"
        sx={{
          flexDirection: "row",
          display: "flex",
          gap: "1rem",
        }}
      >
        <LoadingButton
          variant="outlined"
          title="Export questions to CSV"
          onClick={() => exportToCSV({ questions: formatExportData() })}
          loading={isPending}
        >
          <GetApp sx={{ marginRight: "0.5rem" }} />
          <Typography
            variant="subtitle2"
            sx={{ display: { xs: "none", lg: "block" }, textTransform: "none" }}
          >
            Export to CSV
          </Typography>
        </LoadingButton>
        {children}
      </Grid>
    </Grid>
  );
};
