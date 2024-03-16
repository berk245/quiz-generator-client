import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Alert,
  Typography,
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { QuestionType } from "../../../types";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import { Cancel, CheckCircleRounded, ExpandMore } from "@mui/icons-material";
import { useAcceptQuestion } from "../../../Api/questions";
import { useParams } from "react-router-dom";

const QuestionInReview = ({
  question,
  removeQuestionFromList,
}: {
  question: QuestionType;
  removeQuestionFromList: (e: QuestionType) => void;
}) => {
  const { quizId } = useParams();
  const [questionToSubmit, setQuestionToSubmit] = useState(question);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newObj = {
      ...questionToSubmit,
      [e.target.id]: e.target.value,
    };

    setQuestionToSubmit(newObj);
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const newObj = {
      ...questionToSubmit,
      [e.target.name]: e.target.value,
    };
    setQuestionToSubmit(newObj);
  };

  const { mutate: acceptQuestion, isPending } = useAcceptQuestion();

  const handleSubmit = () => {
    if (!isQuestionValid()) {
      alert(
        "Question fields exceeds the character limit. Please make them shorter and try again."
      );
      return;
    }
    acceptQuestion(
      { quiz_id: quizId ?? "", question: questionToSubmit },
      {
        onSuccess: () => {
          setIsSubmitSuccess(true);
          setTimeout(() => {
            removeQuestionFromList(questionToSubmit);
            setIsSubmitSuccess(false);
          }, 2000);
        },
      }
    );
  };

  const handleDismiss = () => {
    removeQuestionFromList(questionToSubmit);
  };

  const isQuestionValid = () => {
    return (
      questionToSubmit.question_text.length < 1000 &&
      questionToSubmit.correct_answer.length < 1000 &&
      questionToSubmit.multiple_choices.length < 1000
    );
  };
  return (
    <Accordion
      data-testid="question-in-review"
      disableGutters
      defaultExpanded
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
          }}
        >
          <Typography fontSize={"0.9rem"}>
            {questionToSubmit.question_text}
          </Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontSize: "0.85rem",
            gap: "1.5rem",
          }}
        >
          <Grid container direction={"column"} gap={2}>
            <InputField
              value={questionToSubmit.question_text}
              label="Question"
              id="question_text"
              onChange={handleInputChange}
            />
            <InputField
              value={questionToSubmit.correct_answer}
              label="Correct Answer"
              id="correct_answer"
              onChange={handleInputChange}
            />
            {questionToSubmit.question_type === "multi" && (
              <InputField
                value={questionToSubmit.multiple_choices}
                label="Multiple Choices"
                id="multiple_choices"
                onChange={handleInputChange}
              />
            )}
            <FormControl variant="outlined">
              <InputLabel id="question-difficulty-selector">
                Difficulty
              </InputLabel>
              <Select
                labelId="question-difficulty-selector"
                name="difficulty"
                value={questionToSubmit.difficulty ?? ""}
                onChange={handleSelectChange}
                size="small"
                sx={{ fontSize: "0.9rem" }}
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
              value={questionToSubmit.score}
              id="score"
              onChange={handleInputChange}
              inputProps={{
                min: 0, // Set your minimum value
                max: 5, // Set your maximum value
              }}
              sx={{
                lineHeight: "2rem",
                fontSize: "0.85rem",
              }}
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              gap: "0.5rem",
            }}
          >
            <Button
              data-testid="accept-question-btn"
              variant="outlined"
              color="success"
              onClick={handleSubmit}
              sx={{ textTransform: "none", flexBasis: "50%" }}
              startIcon={<CheckCircleRounded />}
            >
              Add Question To Your Quiz
            </Button>
            <Button
              data-testid="dismiss-question-btn"
              variant="outlined"
              color="error"
              onClick={handleDismiss}
              sx={{ textTransform: "none", flexBasis: "50%" }}
              startIcon={<Cancel />}
            >
              Dismiss Question
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
      <LoadingBackdrop
        isSubmitSuccess={isSubmitSuccess}
        isPending={isPending}
      />
    </Accordion>
  );
};

export default QuestionInReview;

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
          fontSize: "0.85rem",
        },
      }}
    />
  );
};

const LoadingBackdrop = ({
  isPending,
  isSubmitSuccess,
}: {
  isPending: boolean;
  isSubmitSuccess: boolean;
}) => {
  return (
    <Backdrop
      data-testid="loading-backdrop"
      sx={{ color: "#fff", zIndex: 2 }}
      open={isPending || isSubmitSuccess}
    >
      {isSubmitSuccess ? (
        <Alert
          icon={<CheckCircleRounded fontSize="inherit" />}
          severity="success"
        >
          Question added to the quiz successfully.
        </Alert>
      ) : (
        <CircularProgress size={60} thickness={4} />
      )}
    </Backdrop>
  );
};
