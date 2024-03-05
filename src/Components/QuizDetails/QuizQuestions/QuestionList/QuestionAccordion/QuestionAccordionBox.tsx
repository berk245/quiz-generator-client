import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { QuestionType } from "../../../../../types";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { EditQuestion } from "./EditQuestion";
import { QuestionDetails } from "./QuestionDetails";
import { QuestionTypeChip } from "./QuestionTypeChip";
import { DifficultyChip } from "./DifficultyChip";
import { ScoreChip } from "./ScoreChip";

export const QuestionAccordionBox = ({
  question,
}: {
  question: QuestionType;
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = (set: boolean) => {
    setIsEdit(set);
  };

  return (
    <Accordion disableGutters sx={{ borderBottom: "1px solid silver" }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            width: "100%",
            minHeight: "2.5rem",
          }}
        >
          <Grid
            sm={5}
            lg={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "0.25rem",
            }}
          >
            <ScoreChip score={question.score} />
            <DifficultyChip difficulty={question.difficulty} />
            <QuestionTypeChip question_type={question.question_type} />
          </Grid>
          <Grid sm>
            <Typography fontSize={"0.9rem"}>
              {question.question_text}{" "}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        {isEdit ? (
          <EditQuestion question={question} toggleEdit={toggleEdit} />
        ) : (
          <QuestionDetails question={question} toggleEdit={toggleEdit} />
        )}
      </AccordionDetails>
    </Accordion>
  );
};
