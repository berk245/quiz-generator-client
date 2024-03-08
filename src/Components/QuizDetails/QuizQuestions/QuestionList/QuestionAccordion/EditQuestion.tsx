import {
  Grid,
  Button,
  TextField,
  LinearProgress,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";

import React, { useState } from "react";
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

  const handleSelectChange = (e: SelectChangeEvent) => {
    const newObj = {
      ...editedQuestionInfo,
      [e.target.name]: e.target.value,
    };
    setEditedQuestionInfo(newObj);
  };

  const { mutate, isPending } = useUpdateQuestion();

  const isQuestionValid = () => {
    return (
      editedQuestionInfo.question_text.length < 1000 &&
      editedQuestionInfo.correct_answer.length < 1000 &&
      editedQuestionInfo.multiple_choices.length < 1000
    );
  };

  const handleSubmit = () => {
    if (!isQuestionValid()) {
      alert(
        "Question fields exceeds the character limit. Please make them shorter and trey again."
      );
      return;
    }
    mutate(editedQuestionInfo);
  };

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
          <Grid container direction={"column"} gap={2}>
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
            <FormControl variant="outlined">
              <InputLabel
                id="question-difficulty-selector"
                sx={{ backgroundColor: "white" }}
              >
                Difficulty
              </InputLabel>
              <Select
                labelId="question-difficulty-selector"
                name="difficulty"
                value={editedQuestionInfo.difficulty ?? ""}
                onChange={handleSelectChange}
                size="small"
                sx={{ fontSize: "0.8rem" }}
              >
                <MenuItem disabled value="-">
                  Choose difficulty level
                </MenuItem>
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Score"
              size="small"
              type="number"
              value={editedQuestionInfo.score}
              id="score"
              onChange={handleInputChange}
              inputProps={{
                min: 0,
                max: 5,
              }}
              sx={{
                "& .MuiInputBase-input": {
                  height: "1.5rem",
                  fontSize: "0.85rem",
                },
              }}
            />
          </Grid>
          <Grid
            justifyContent={"flex-end"}
            sx={{ display: "flex", width: "100%" }}
          >
            <Button onClick={handleSubmit}>Update</Button>
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
      error={value.length > 1000}
      sx={{
        "& .MuiInputBase-input": {
          height: "1.5rem",
          fontSize: "0.85rem",
        },
      }}
    />
  );
};
