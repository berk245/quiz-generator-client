import { Grid, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { QuestionType } from "../../../../../types";

export const EditQuestion = ({
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
