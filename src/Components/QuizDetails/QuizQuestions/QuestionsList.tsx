import { Grid, Typography, Chip, Button, TextField } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { Edit, ExpandMore } from "@mui/icons-material";
import { QuestionType } from "../../../types";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

export const QuestionsList = ({ questions }: { questions: QuestionType[] }) => {
  return (
    <Grid container direction="column">
      <Grid
        container
        direction="column"
        height="100%"
        sx={{
          border: "1px solid #ebebeb",
          borderRadius: "5px",
        }}
      >
        {questions.map((question) => {
          return (
            <QuestionAccordionBox
              question={question}
              key={question.question_id}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

const QuestionAccordionBox = ({ question }: { question: QuestionType }) => {
  const isMultiptleChioce = question.question_type === "multi";
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
          }}
        >
          <Chip
            variant="outlined"
            label={isMultiptleChioce ? "multiple choice" : "other type"}
            color={isMultiptleChioce ? "secondary" : "info"}
            size="small"
            sx={{
              fontSize: "0.6rem",
            }}
          />
          <Typography fontSize={"0.9rem"}>{question.question_text} </Typography>
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

const QuestionDetails = ({
  question,
  toggleEdit,
}: {
  question: QuestionType;
  toggleEdit: (set: boolean) => void;
}) => {
  return (
    <Grid spacing={3} container>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "0.9rem",
          gap: "0.5rem",
        }}
      >
        <span> Correct answer: {question.correct_answer}</span>
        {question.multiple_choices && (
          <span> Multiple choices: {question.correct_answer}</span>
        )}
      </Grid>
      <Grid item xs={12} sx={{ width: "100%" }}>
        <Button
          onClick={() => toggleEdit(true)}
          variant="outlined"
          sx={{
            padding: "0.15rem 0.5rem",
            textTransform: "none",
            fontSize: "0.85rem",
            width: "100%",
            // marginTop: "1rem",
            ":hover": {
              opacity: "0.8",
            },
          }}
          startIcon={<Edit sx={{ width: "0.9rem" }} />}
        >
          Edit Question
        </Button>
      </Grid>
    </Grid>
  );
};

const EditQuestion = ({
  question,
  toggleEdit,
}: {
  question: QuestionType;
  toggleEdit: (set: boolean) => void;
}) => {
  const [editedQuestionInfo, setEditedQuestionInfo] = useState({ ...question });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newObj = {
      ...editedQuestionInfo,
      [e.target.id]: e.target.value,
    };
    setEditedQuestionInfo(newObj);
  };
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "0.85rem",
          gap: "0.5rem",
        }}
      >
        <Grid container direction={"column"}>
          <TextField
            label="Question: "
            size="small"
            value={editedQuestionInfo.question_text}
            id="question_text"
            onChange={handleInputChange}
            sx={{
              lineHeight: "2rem",
              marginTop: "1rem",
              fontSize: "0.85rem",
            }}
          />
          <TextField
            label="Correct answer: "
            size="small"
            value={editedQuestionInfo.correct_answer}
            id="coorect_answer"
            onChange={handleInputChange}
            sx={{
              lineHeight: "2rem",
              marginTop: "1rem",
              fontSize: "0.85rem",
            }}
          />
          {question.question_type === "multi" && (
            <TextField
              label="Multiple Choices: "
              size="small"
              value={editedQuestionInfo.multiple_choices}
              id="multiple_choices"
              onChange={handleInputChange}
              sx={{
                lineHeight: "2rem",
                marginTop: "1rem",
                fontSize: "0.85rem",
              }}
            />
          )}
        </Grid>
        <Grid
          justifyContent={"flex-end"}
          sx={{ display: "flex", width: "100%" }}
        >
          <Button
            onClick={() =>
              console.log("Will send put request", editedQuestionInfo)
            }
          >
            Update
          </Button>
          <Button color="error" onClick={() => toggleEdit(false)}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
