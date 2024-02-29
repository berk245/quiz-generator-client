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
} from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  componentInDisplayAtom,
  generatedQuestionsAtom,
} from "../../Views/GenerateQuestions/atoms";
import { LoadingButton } from "@mui/lab";
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
    return (
      generateSettings.amount &&
      generateSettings.question_type &&
      generateSettings.quiz_id
    );
  };

  const handleSubmit = () => {
    if (!isInputValid(generateSettings)) {
      alert("Please fill all the required fields.");
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
          value={generateSettings.amount}
          onChange={handleInputChange}
          sx={{ background: "#fff" }}
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
          label="Instructions"
          type="text"
          multiline
          minRows={3}
          placeholder="Provide instructions for question generation. You can specify the difficulty, language style, etc."
          variant="filled"
          value={generateSettings.instructions}
          onChange={handleInputChange}
          sx={{ background: "#fff" }}
        />

        <LoadingButton
          variant="contained"
          loading={isPending}
          onClick={handleSubmit}
        >
          Generate Questions
        </LoadingButton>
        <Button
          variant="text"
          onClick={() => navigate(`/quizzes/${quizId}`, { replace: true })}
        >
          Go back
        </Button>
      </Box>
    </Grid>
  );
};

export default GenerateQuestionsForm;
