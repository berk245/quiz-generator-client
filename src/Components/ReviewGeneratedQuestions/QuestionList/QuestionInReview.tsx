import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Alert,
  Typography,
  Backdrop,
  CircularProgress,
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
  const [questionToSubmit, setQuestionToSubmit] = useState({ ...question });
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newObj = {
      ...questionToSubmit,
      [e.target.id]: e.target.value,
    };

    setQuestionToSubmit(newObj);
  };

  const { mutate: acceptQuestion, isPending } = useAcceptQuestion();

  const handleSubmit = () => {
    acceptQuestion(
      { quiz_id: quizId ?? "", question: question },
      {
        onSuccess: () => {
          setIsSubmitSuccess(true);
          setTimeout(() => {
            removeQuestionFromList(question);
            setIsSubmitSuccess(false);
          }, 2000);
        },
      }
    );
  };

  const handleDismiss = () => {
    removeQuestionFromList(question);
  };
  return (
    <Accordion
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
          {/* Chip */}
          <Typography fontSize={"0.9rem"}>
            {question.question_id} {question.question_text}{" "}
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
          <Grid container direction={"column"}>
            <InputField
              value={question.question_text}
              label="Question"
              id="question_text"
              onChange={handleInputChange}
            />
            <InputField
              value={question.correct_answer}
              label="Correct Answer"
              id="correct_answer"
              onChange={handleInputChange}
            />
            {question.question_type === "multi" && (
              <InputField
                value={question.multiple_choices}
                label="Multiple Choices"
                id="multiple_choices"
                onChange={handleInputChange}
              />
            )}
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
              variant="outlined"
              color="success"
              onClick={handleSubmit}
              sx={{ textTransform: "none", flexBasis: "50%" }}
              startIcon={<CheckCircleRounded />}
            >
              Add Question To Your Quiz
            </Button>
            <Button
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
      sx={{
        marginTop: "1rem",

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
