import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useSetAtom } from "jotai";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  componentInDisplayAtom,
  generatedQuestionsAtom,
} from "../../Views/GenerateQuestions/atoms";
import {
  GenerateQuestionSettingsProps,
  useGenerateQuestions,
} from "../../Api/questions";

const GenerateQuestionsForm = () => {
  const setComponentInDisplay = useSetAtom(componentInDisplayAtom);
  const setGeneratedQuestions = useSetAtom(generatedQuestionsAtom);
  const { quizId } = useParams();
  const navigate = useNavigate();

  const { mutate, isPending } = useGenerateQuestions();

  const [generateSettings, setGenerateSettings] = useState({
    quiz_id: quizId ?? "",
    amount: 5,
    question_type: "multiple-choice",
    instructions: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newObj = {
      ...generateSettings,
      [e.target.id]: e.target.value,
    };
    setGenerateSettings(newObj);
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const newObj = {
      ...generateSettings,
      [e.target.name]: e.target.value,
    };
    setGenerateSettings(newObj);
  };

  const isInputValid = (generateSettings: GenerateQuestionSettingsProps) => {
    if (generateSettings.instructions) {
      if (generateSettings.instructions.length > 1000) {
        return false;
      }
    }

    return (
      generateSettings.amount > 0 &&
      generateSettings.amount <= 20 &&
      generateSettings.question_type &&
      generateSettings.quiz_id
    );
  };

  const handleSubmit = () => {
    if (!isInputValid(generateSettings)) {
      alert(
        "Please make sure the required fields are filled with accepted values."
      );
      return;
    }
    mutate(generateSettings, {
      onSuccess: (res) => {
        setGeneratedQuestions(res.questions);
        setComponentInDisplay("results");
      },
    });
  };

  return (
    <Grid
      item
      xs={8}
      sm={9.75}
      padding={"0rem 1rem"}
      sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem 2rem",
        }}
      >
        <TextField
          id="amount"
          label="Amount"
          type="number"
          variant="filled"
          required
          value={generateSettings.amount}
          onChange={handleInputChange}
          sx={{ background: "#fff" }}
          error={generateSettings.amount > 20 || generateSettings.amount <= 0}
          helperText={
            generateSettings.amount > 20
              ? "Maximum 20 questions at a time."
              : ""
          }
          inputProps={{
            min: 1,
            max: 20,
          }}
        />
        <FormControl variant="filled" sx={{ background: "#fff" }}>
          <InputLabel id="demo-simple-select-standard-label">
            Question Type
          </InputLabel>

          <Select
            labelId="demo-simple-select-standard-label"
            id="question_type"
            value={generateSettings.question_type}
            onChange={handleSelectChange}
          >
            <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
            <MenuItem value="-" disabled>
              Open-ended (Coming soon)
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="instructions"
          label="Instructions (Optional)"
          type="text"
          multiline
          minRows={3}
          placeholder="Provide instructions for question generation. You can specify the difficulty, language, style, etc."
          variant="filled"
          value={generateSettings.instructions}
          onChange={handleInputChange}
          error={generateSettings.instructions.length > 1000}
          helperText={
            generateSettings.instructions.length > 950 &&
            `${generateSettings.instructions.length} / 1000 `
          }
          sx={{ background: "#fff" }}
        />

        <Button
          data-testid="loading-btn"
          variant="contained"
          onClick={handleSubmit}
        >
          Generate Questions
        </Button>
        <Button
          variant="text"
          onClick={() => navigate(`/quizzes/${quizId}`, { replace: true })}
        >
          Go back
        </Button>
      </Box>
      <LoadingBackdrop isPending={isPending} />
    </Grid>
  );
};

export default GenerateQuestionsForm;

const LoadingBackdrop = ({ isPending }: { isPending: boolean }) => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 2 }} open={isPending}>
      <CircularProgress size={60} thickness={4} sx={{ color: "white" }} />
    </Backdrop>
  );
};
