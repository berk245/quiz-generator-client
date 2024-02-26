import { Grid, Button, TextField, LinearProgress } from "@mui/material";
import React, { useContext, useState } from "react";
import { QuestionType } from "../../../../../types";
import { useUpdateQuestion } from "../../../../../Api/questions";

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

  const { mutate, isPending } = useUpdateQuestion();

  return (
    <Grid container>
      {isPending ? (
        <LinearProgress />
      ) : (
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
            <InputField
              value={editedQuestionInfo.question_text}
              label="Question"
              id="question_text"
              onChange={handleInputChange}
            />
            <InputField
              value={editedQuestionInfo.correct_answer}
              label="Correct Answer"
              id="correct_answer"
              onChange={handleInputChange}
            />
            {question.question_type === "multi" && (
              <InputField
                value={editedQuestionInfo.multiple_choices}
                label="Multiple Choices"
                id="multiple_choices"
                onChange={handleInputChange}
              />
            )}
          </Grid>
          <Grid
            justifyContent={"flex-end"}
            sx={{ display: "flex", width: "100%" }}
          >
            <Button onClick={() => mutate(editedQuestionInfo)}>Update</Button>
            <Button color="error" onClick={() => toggleEdit(false)}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

const InputField = ({
  value,
  id,
  label,
  onChange,
}: {
  value: string;
  label: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <TextField
      label={label}
      size="small"
      value={value}
      id={id}
      onChange={onChange}
      sx={{
        lineHeight: "2rem",
        marginTop: "1rem",
        fontSize: "0.85rem",
      }}
    />
  );
};
