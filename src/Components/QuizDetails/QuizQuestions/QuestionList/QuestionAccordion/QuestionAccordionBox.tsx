import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { QuestionType } from "../../../../../types";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { EditQuestion } from "./EditQuestion";
import { QuestionDetails } from "./QuestionDetails";

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
    <Accordion
      data-testid="quiz-question"
      disableGutters
      sx={{ borderBottom: "1px solid silver" }}
    >
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
